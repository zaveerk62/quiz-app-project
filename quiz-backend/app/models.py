from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship, declarative_base
import datetime

Base = declarative_base()

class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    quiz_collections = relationship('QuizCollection', back_populates='category', cascade='all, delete')

class QuizCollection(Base):
    __tablename__ = 'quiz_collections'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    difficulty = Column(String, nullable=False, default="Medium")
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    category = relationship('Category', back_populates='quiz_collections')
    questions = relationship('Quiz', back_populates='collection', cascade='all, delete')

class Quiz(Base):
    __tablename__ = 'quizzes'
    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, nullable=False)
    option1 = Column(String, nullable=False)
    option2 = Column(String, nullable=False)
    option3 = Column(String, nullable=False)
    option4 = Column(String, nullable=False)
    correct_answer = Column(String, nullable=False)
    collection_id = Column(Integer, ForeignKey('quiz_collections.id'), nullable=False)
    collection = relationship('QuizCollection', back_populates='questions')

class Result(Base):
    __tablename__ = 'results'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    total_questions = Column(Integer, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow) 