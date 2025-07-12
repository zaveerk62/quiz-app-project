
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Atom, Castle, Music, Film, Globe, BookOpen, Monitor, Trophy } from "lucide-react";
import { getCategories, getQuizzes } from "../lib/api"; // adjust path if needed

type Quiz = {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  category_id: number;
};

// Map backend category names to icons/colors
const categoryUI = {
  "General Knowledge": { icon: Brain, color: "from-purple-500 to-pink-500" },
  "Science": { icon: Atom, color: "from-blue-500 to-cyan-500" },
  "History": { icon: Castle, color: "from-amber-500 to-orange-500" },
  "Math": { icon: BookOpen, color: "from-green-500 to-emerald-500" },
  "Sports": { icon: Trophy, color: "from-red-500 to-pink-500" },
  "Music": { icon: Music, color: "from-violet-500 to-purple-500" },
  "Movies": { icon: Film, color: "from-indigo-500 to-blue-500" },
  "Geography": { icon: Globe, color: "from-teal-500 to-cyan-500" },
  "Literature": { icon: BookOpen, color: "from-orange-500 to-red-500" },
  "Technology": { icon: Monitor, color: "from-slate-500 to-gray-500" },
};

export const CategoriesSection = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string } | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizzesLoading, setQuizzesLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [quizId: number]: string }>({});
  const [submitted, setSubmitted] = useState<{ [quizId: number]: boolean }>({});

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const handleExploreQuizzes = async (category: { id: number; name: string }) => {
    setSelectedCategory(category);
    setQuizzes([]);
    setQuizzesLoading(true);
    try {
      const data = await getQuizzes(category.id);
      setQuizzes(data);
    } catch {
      setQuizzes([]);
    } finally {
      setQuizzesLoading(false);
    }
  };

  const handleOptionChange = (quizId: number, option: string) => {
    setUserAnswers((prev) => ({ ...prev, [quizId]: option }));
  };
  
  const handleSubmit = (quizId: number) => {
    setSubmitted((prev) => ({ ...prev, [quizId]: true }));
  };

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Explore Quiz Categories</h2>
        {loading ? (
          <div className="text-center text-slate-300">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {categories.map((category) => {
              const ui = categoryUI[category.name] || { icon: Brain, color: "from-gray-500 to-gray-700" };
              const Icon = ui.icon;
              return (
                <div key={category.id} className="group">
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className={`bg-gradient-to-br ${ui.color} rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-4`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-center mb-4 text-slate-200">{category.name}</h3>
                    <Button 
                      size="sm" 
                      className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 hover:text-white text-xs border-0 h-8"
                      onClick={() => handleExploreQuizzes(category)}
                    >
                      Explore Quizzes
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quizzes Section */}
        {selectedCategory && (
          <div className="mt-12 max-w-3xl mx-auto bg-slate-800/60 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Quizzes in {selectedCategory.name}
            </h3>
            {quizzesLoading ? (
              <div className="text-slate-300">Loading quizzes...</div>
            ) : quizzes.length === 0 ? (
              <div className="text-slate-400">No quizzes found for this category.</div>
            ) : (
              <ul className="space-y-4">
        {quizzes.map((quiz: Quiz) => (
          <li key={quiz.id} className="bg-slate-700/50 rounded p-4 text-slate-200">
            <div className="font-semibold mb-2">{quiz.question}</div>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(quiz.id);
              }}
            >
              <ul className="ml-4 mt-2 space-y-2">
                {quiz.options.map((opt, idx) => (
                  <li key={idx}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`quiz-${quiz.id}`}
                        value={opt}
                        disabled={!!submitted[quiz.id]}
                        checked={userAnswers[quiz.id] === opt}
                        onChange={() => handleOptionChange(quiz.id, opt)}
                        className="accent-blue-500"
                      />
                      <span>{opt}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <Button
                type="submit"
                size="sm"
                className="mt-4"
                disabled={submitted[quiz.id] || !userAnswers[quiz.id]}
              >
                Submit
              </Button>
              {submitted[quiz.id] && (
                <div className="mt-2">
                  {userAnswers[quiz.id] === quiz.correct_answer ? (
                    <span className="text-green-400 font-bold">Correct!</span>
                  ) : (
                    <span className="text-red-400 font-bold">
                      Incorrect. Correct answer: {quiz.correct_answer}
                    </span>
                  )}
                </div>
              )}
            </form>
          </li>
        ))}
      </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
