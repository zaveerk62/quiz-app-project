from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas, database
from typing import List

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/results", response_model=schemas.ResultOut)
def create_result(result: schemas.ResultCreate, db: Session = Depends(get_db)):
    db_result = crud.create_result(db, result)
    return db_result

@router.get("/results", response_model=List[schemas.ResultOut])
def list_results(db: Session = Depends(get_db)):
    return crud.get_results(db) 