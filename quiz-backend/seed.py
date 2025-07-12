import requests

API_URL = "http://127.0.0.1:8000"

# Dummy categories
categories = [
    "General Knowledge", "Science", "History", "Math", "Sports"
]
category_ids = {}

# Create categories if not exist
for name in categories:
    res = requests.get(f"{API_URL}/categories")
    exists = any(cat["name"] == name for cat in res.json())
    if not exists:
        res = requests.post(f"{API_URL}/categories", json={"name": name})
        if res.ok:
            print(f"Created category: {name}")
            category_ids[name] = res.json()["id"]
        else:
            print(f"Failed to create category: {name} ({res.text})")
    else:
        print(f"Category already exists: {name}")
        # Get the id
        for cat in res.json():
            if cat["name"] == name:
                category_ids[name] = cat["id"]

# Dummy quizzes (one collection per category)
import random
difficulties = ["Easy", "Medium", "Hard"]
dummy_quizzes = {
    "General Knowledge": [
        {
            "question": "What is the capital of France?",
            "options": ["Paris", "London", "Berlin", "Madrid"],
            "correct_answer": "Paris"
        },
        {
            "question": "Which planet is known as the Red Planet?",
            "options": ["Earth", "Mars", "Jupiter", "Saturn"],
            "correct_answer": "Mars"
        }
    ],
    "Science": [
        {
            "question": "What is H2O commonly known as?",
            "options": ["Oxygen", "Hydrogen", "Water", "Salt"],
            "correct_answer": "Water"
        },
        {
            "question": "What gas do plants absorb from the atmosphere?",
            "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
            "correct_answer": "Carbon Dioxide"
        }
    ],
    "History": [
        {
            "question": "Who was the first President of the United States?",
            "options": ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"],
            "correct_answer": "George Washington"
        },
        {
            "question": "In which year did World War II end?",
            "options": ["1945", "1939", "1918", "1965"],
            "correct_answer": "1945"
        }
    ],
    "Math": [
        {
            "question": "What is the value of Pi (approx)?",
            "options": ["2.14", "3.14", "4.13", "3.41"],
            "correct_answer": "3.14"
        },
        {
            "question": "What is 12 x 8?",
            "options": ["96", "88", "108", "86"],
            "correct_answer": "96"
        }
    ],
    "Sports": [
        {
            "question": "How many players are there in a football (soccer) team?",
            "options": ["9", "10", "11", "12"],
            "correct_answer": "11"
        },
        {
            "question": "Which sport uses a shuttlecock?",
            "options": ["Tennis", "Cricket", "Badminton", "Table Tennis"],
            "correct_answer": "Badminton"
        }
    ],
    "Music": [
        {
            "question": "Which singer is known as the 'King of Pop'?",
            "options": ["Elvis Presley", "Justin Bieber", "Michael Jackson", "Prince"],
            "correct_answer": "Michael Jackson"
        },
        {
            "question": "Which instrument has 88 keys?",
            "options": ["Guitar", "Piano", "Drum", "Violin"],
            "correct_answer": "Piano"
        }
    ],
    "Movies": [
        {
            "question": "Who directed the movie 'Inception'?",
            "options": ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Martin Scorsese"],
            "correct_answer": "Christopher Nolan"
        },
        {
            "question": "Which movie has the quote 'I'll be back'?",
            "options": ["The Matrix", "Die Hard", "The Terminator", "RoboCop"],
            "correct_answer": "The Terminator"
        }
    ],
    "Geography": [
        {
            "question": "Which is the largest ocean in the world?",
            "options": ["Atlantic", "Indian", "Pacific", "Arctic"],
            "correct_answer": "Pacific"
        },
        {
            "question": "Which country has the most number of time zones?",
            "options": ["Russia", "China", "USA", "France"],
            "correct_answer": "France"
        }
    ],
    "Literature": [
        {
            "question": "Who wrote '1984'?",
            "options": ["Aldous Huxley", "George Orwell", "J.K. Rowling", "Ernest Hemingway"],
            "correct_answer": "George Orwell"
        },
        {
            "question": "Which novel starts with 'Call me Ishmael'?",
            "options": ["The Great Gatsby", "Moby Dick", "Dracula", "Frankenstein"],
            "correct_answer": "Moby Dick"
        }
    ],
    "Technology": [
        {
            "question": "Who is the founder of Microsoft?",
            "options": ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
            "correct_answer": "Bill Gates"
        },
        {
            "question": "What does CPU stand for?",
            "options": ["Central Processing Unit", "Core Power Unit", "Computer Power Unit", "Control Processor Unit"],
            "correct_answer": "Central Processing Unit"
        }
    ]
}

# Create quiz collections if not exist
for cat, questions in dummy_quizzes.items():
    # Check if a collection with this title exists
    title = f"{cat} Starter Quiz"
    res = requests.get(f"{API_URL}/quiz-collections?category={category_ids[cat]}")
    exists = any(qc["title"] == title for qc in res.json())
    if not exists:
        payload = {
            "title": title,
            "description": f"A starter quiz for {cat}.",
            "difficulty": random.choice(difficulties),
            "category_id": category_ids[cat],
            "questions": questions
        }
        res = requests.post(f"{API_URL}/quiz-collections", json=payload)
        if res.ok:
            print(f"Created quiz collection: {title}")
        else:
            print(f"Failed to create quiz collection: {title} ({res.text})")
    else:
        print(f"Quiz collection already exists: {title}")
