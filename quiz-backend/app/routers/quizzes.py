from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from .. import crud, schemas, database
from typing import List, Optional

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/quiz-collections", response_model=List[schemas.QuizCollectionOut])
def list_quiz_collections(category: int = Query(...), db: Session = Depends(get_db)):
    collections = crud.get_quiz_collections_by_category(db, category)
    # Add question count to each collection
    result = []
    for collection in collections:
        questions = crud.get_quizzes_by_collection(db, collection.id)
        collection_dict = {
            "id": collection.id,
            "title": collection.title,
            "description": collection.description,
            "difficulty": collection.difficulty,
            "category_id": collection.category_id,
            "created_at": collection.created_at,
            "question_count": len(questions)
        }
        result.append(collection_dict)
    return result

@router.post("/quiz-collections", response_model=schemas.QuizCollectionOut)
def create_quiz_collection(collection: schemas.QuizCollectionCreate, db: Session = Depends(get_db)):
    db_collection = crud.create_quiz_collection(db, collection)
    questions = crud.get_quizzes_by_collection(db, db_collection.id)
    return schemas.QuizCollectionOut(
        id=db_collection.id,
        title=db_collection.title,
        description=db_collection.description,
        difficulty=db_collection.difficulty,
        category_id=db_collection.category_id,
        created_at=db_collection.created_at,
        question_count=len(questions)
    )

@router.get("/quiz-collections/{collection_id}/questions", response_model=List[schemas.QuizOut])
def get_questions_by_collection(collection_id: int, db: Session = Depends(get_db)):
    questions = crud.get_quizzes_by_collection(db, collection_id)
    # Map options fields to list
    return [schemas.QuizOut(
        id=q.id,
        question=q.question,
        options=[q.option1, q.option2, q.option3, q.option4],
        correct_answer=q.correct_answer,
        collection_id=q.collection_id
    ) for q in questions]

@router.delete("/quiz-collections/{collection_id}", status_code=204)
def delete_quiz_collection(collection_id: int, db: Session = Depends(get_db)):
    success = crud.delete_quiz_collection(db, collection_id)
    if not success:
        raise HTTPException(status_code=404, detail="Quiz collection not found")
    return None

# Legacy endpoints for backward compatibility
@router.get("/quizzes", response_model=List[schemas.QuizOut])
def list_quizzes(category: int = Query(...), db: Session = Depends(get_db)):
    # Get all collections for the category and flatten their questions
    collections = crud.get_quiz_collections_by_category(db, category)
    all_questions = []
    for collection in collections:
        questions = crud.get_quizzes_by_collection(db, collection.id)
        for q in questions:
            all_questions.append(schemas.QuizOut(
                id=q.id,
                question=q.question,
                options=[q.option1, q.option2, q.option3, q.option4],
                correct_answer=q.correct_answer,
                collection_id=q.collection_id
            ))
    return all_questions

@router.post("/quizzes", response_model=schemas.QuizOut)
def create_quiz(quiz: schemas.QuizCreate, db: Session = Depends(get_db)):
    db_quiz = crud.create_quiz(db, quiz)
    return schemas.QuizOut(
        id=db_quiz.id,
        question=db_quiz.question,
        options=[db_quiz.option1, db_quiz.option2, db_quiz.option3, db_quiz.option4],
        correct_answer=db_quiz.correct_answer,
        collection_id=db_quiz.collection_id
    )

@router.put("/quizzes/{quiz_id}", response_model=schemas.QuizOut)
def update_quiz(quiz_id: int, quiz: schemas.QuizUpdate, db: Session = Depends(get_db)):
    db_quiz = crud.update_quiz(db, quiz_id, quiz)
    if not db_quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return schemas.QuizOut(
        id=db_quiz.id,
        question=db_quiz.question,
        options=[db_quiz.option1, db_quiz.option2, db_quiz.option3, db_quiz.option4],
        correct_answer=db_quiz.correct_answer,
        collection_id=db_quiz.collection_id
    )

@router.delete("/quizzes/{quiz_id}", status_code=204)
def delete_quiz(quiz_id: int, db: Session = Depends(get_db)):
    success = crud.delete_quiz(db, quiz_id)
    if not success:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return None 