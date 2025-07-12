from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional
import datetime

# Category CRUD

def get_categories(db: Session) -> List[models.Category]:
    return db.query(models.Category).all()

def create_category(db: Session, category: schemas.CategoryCreate) -> models.Category:
    db_category = models.Category(name=category.name)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def delete_category(db: Session, category_id: int) -> bool:
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if category:
        db.delete(category)
        db.commit()
        return True
    return False

# Quiz Collection CRUD

def get_quiz_collections_by_category(db: Session, category_id: int) -> List[models.QuizCollection]:
    return db.query(models.QuizCollection).filter(models.QuizCollection.category_id == category_id).all()

def create_quiz_collection(db: Session, collection_data: schemas.QuizCollectionCreate) -> models.QuizCollection:
    # Create the collection
    db_collection = models.QuizCollection(
        title=collection_data.title,
        description=collection_data.description,
        difficulty=collection_data.difficulty,
        category_id=collection_data.category_id
    )
    db.add(db_collection)
    db.commit()
    db.refresh(db_collection)
    
    # Create the questions
    for question_data in collection_data.questions:
        db_question = models.Quiz(
            question=question_data["question"],
            option1=question_data["options"][0],
            option2=question_data["options"][1],
            option3=question_data["options"][2],
            option4=question_data["options"][3],
            correct_answer=question_data["correct_answer"],
            collection_id=db_collection.id
        )
        db.add(db_question)
    
    db.commit()
    db.refresh(db_collection)
    return db_collection

def get_quiz_collection(db: Session, collection_id: int) -> Optional[models.QuizCollection]:
    return db.query(models.QuizCollection).filter(models.QuizCollection.id == collection_id).first()

def delete_quiz_collection(db: Session, collection_id: int) -> bool:
    collection = db.query(models.QuizCollection).filter(models.QuizCollection.id == collection_id).first()
    if collection:
        db.delete(collection)
        db.commit()
        return True
    return False

# Quiz CRUD (for individual questions)

def get_quizzes_by_collection(db: Session, collection_id: int) -> List[models.Quiz]:
    return db.query(models.Quiz).filter(models.Quiz.collection_id == collection_id).all()

def create_quiz(db: Session, quiz: schemas.QuizCreate) -> models.Quiz:
    db_quiz = models.Quiz(
        question=quiz.question,
        option1=quiz.options[0],
        option2=quiz.options[1],
        option3=quiz.options[2],
        option4=quiz.options[3],
        correct_answer=quiz.correct_answer,
        collection_id=quiz.collection_id
    )
    db.add(db_quiz)
    db.commit()
    db.refresh(db_quiz)
    return db_quiz

def update_quiz(db: Session, quiz_id: int, quiz: schemas.QuizUpdate) -> Optional[models.Quiz]:
    db_quiz = db.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()
    if not db_quiz:
        return None
    if quiz.question is not None:
        db_quiz.question = quiz.question
    if quiz.options is not None:
        db_quiz.option1 = quiz.options[0]
        db_quiz.option2 = quiz.options[1]
        db_quiz.option3 = quiz.options[2]
        db_quiz.option4 = quiz.options[3]
    if quiz.correct_answer is not None:
        db_quiz.correct_answer = quiz.correct_answer
    db.commit()
    db.refresh(db_quiz)
    return db_quiz

def delete_quiz(db: Session, quiz_id: int) -> bool:
    db_quiz = db.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()
    if db_quiz:
        db.delete(db_quiz)
        db.commit()
        return True
    return False

def get_quiz_by_id(db: Session, quiz_id: int) -> Optional[models.Quiz]:
    return db.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()

# Result CRUD

def create_result(db: Session, result: schemas.ResultCreate) -> models.Result:
    db_result = models.Result(
        username=result.username,
        score=result.score,
        total_questions=result.total_questions,
        timestamp=datetime.datetime.utcnow()
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result

def get_results(db: Session) -> List[models.Result]:
    return db.query(models.Result).order_by(models.Result.timestamp.desc()).all() 