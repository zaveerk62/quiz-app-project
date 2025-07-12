// src/api.ts
const API_BASE = process.env.VITE_API_URL;

// --- Category Endpoints ---

export async function getCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function createCategory(name: string) {
  const res = await fetch(`${API_BASE}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function deleteCategory(id: number) {
  const res = await fetch(`${API_BASE}/categories/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete category");
}

// --- Quiz Collection Endpoints ---

export async function getQuizCollections(categoryId: number) {
  const res = await fetch(`${API_BASE}/quiz-collections?category=${categoryId}`);
  if (!res.ok) throw new Error("Failed to fetch quiz collections");
  return res.json();
}

export async function createQuizCollection(collection: {
  title: string;
  description: string;
  difficulty: string;
  category_id: number;
  questions: {
    question: string;
    options: string[];
    correct_answer: string;
  }[];
}) {
  const res = await fetch(`${API_BASE}/quiz-collections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(collection),
  });
  if (!res.ok) throw new Error("Failed to create quiz collection");
  return res.json();
}

export async function getQuestionsByCollection(collectionId: number) {
  const res = await fetch(`${API_BASE}/quiz-collections/${collectionId}/questions`);
  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
}

// --- Quiz Endpoints (Legacy) ---

export async function getQuizzes(categoryId: number) {
  const res = await fetch(`${API_BASE}/quizzes?category=${categoryId}`);
  if (!res.ok) throw new Error("Failed to fetch quizzes");
  return res.json();
}

export async function createQuiz(quiz: {
  question: string;
  options: string[];
  correct_answer: string;
  collection_id: number;
}) {
  const res = await fetch(`${API_BASE}/quizzes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quiz),
  });
  if (!res.ok) throw new Error("Failed to create quiz");
  return res.json();
}

export async function updateQuiz(id: number, quiz: Partial<{
  question: string;
  options: string[];
  correct_answer: string;
}>) {
  const res = await fetch(`${API_BASE}/quizzes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quiz),
  });
  if (!res.ok) throw new Error("Failed to update quiz");
  return res.json();
}

export async function deleteQuiz(id: number) {
  const res = await fetch(`${API_BASE}/quizzes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete quiz");
}

// --- Result Endpoints ---

export async function getResults() {
  const res = await fetch(`${API_BASE}/results`);
  if (!res.ok) throw new Error("Failed to fetch results");
  return res.json();
}

export async function createResult(result: {
  username: string;
  score: number;
  total_questions: number;
}) {
  const res = await fetch(`${API_BASE}/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });
  if (!res.ok) throw new Error("Failed to save result");
  return res.json();
}