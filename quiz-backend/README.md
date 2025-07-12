# Quiz Backend (FastAPI)

A simple backend for a quiz platform using FastAPI, SQLAlchemy, and SQLite.

## Features
- Category and Quiz CRUD
- Result tracking
- CORS enabled for frontend integration

## Setup & Run

1. **Install dependencies**

```bash
cd quiz-backend
pip install -r requirements.txt
```

2. **Run the server**

```bash
uvicorn app.main:app --reload
```

- The API will be available at http://127.0.0.1:8000
- Interactive docs: http://127.0.0.1:8000/docs

## Project Structure

```
quiz-backend/
├── app/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── database.py
│   └── routers/
│       ├── categories.py
│       ├── quizzes.py
│       └── results.py
├── requirements.txt
└── migrations/
``` 