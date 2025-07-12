from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryOut(CategoryBase):
    id: int
    class Config:
        orm_mode = True

class QuizCollectionBase(BaseModel):
    title: str
    description: str
    difficulty: str = "Medium"
    category_id: int

class QuizCollectionCreate(QuizCollectionBase):
    questions: List[dict]  # List of question objects

class QuizCollectionUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    difficulty: Optional[str] = None
    category_id: Optional[int] = None

class QuizCollectionOut(QuizCollectionBase):
    id: int
    created_at: datetime
    question_count: int
    class Config:
        orm_mode = True

class QuizBase(BaseModel):
    question: str
    options: List[str] = Field(..., min_items=4, max_items=4)
    correct_answer: str

class QuizCreate(QuizBase):
    collection_id: int

class QuizUpdate(BaseModel):
    question: Optional[str] = None
    options: Optional[List[str]] = None
    correct_answer: Optional[str] = None

class QuizOut(BaseModel):
    id: int
    question: str
    options: List[str]
    correct_answer: str
    collection_id: int
    class Config:
        orm_mode = True

class ResultBase(BaseModel):
    username: str
    score: int
    total_questions: int

class ResultCreate(ResultBase):
    pass

class ResultOut(ResultBase):
    id: int
    timestamp: datetime
    class Config:
        orm_mode = True 