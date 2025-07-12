import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { getQuestionsByCollection } from "../lib/api";

type Quiz = {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  category_id: number;
};

export const QuizPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [quizId: number]: string }>({});
  const [submitted, setSubmitted] = useState<{ [quizId: number]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (categoryId) {
      loadQuizzes(parseInt(categoryId));
    }
  }, [categoryId]);

  const loadQuizzes = async (collectionId: number) => {
    try {
      const data = await getQuestionsByCollection(collectionId);
      setQuizzes(data);
    } catch (error) {
      console.error("Failed to load quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    const currentQuiz = quizzes[currentQuestionIndex];
    setUserAnswers(prev => ({
      ...prev,
      [currentQuiz.id]: option
    }));
  };

  const handleSubmitAnswer = () => {
    const currentQuiz = quizzes[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuiz.id];
    
    if (!userAnswer) return;

    setSubmitted(prev => ({
      ...prev,
      [currentQuiz.id]: true
    }));

    // Check if answer is correct
    if (userAnswer === currentQuiz.correct_answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleFinishQuiz = () => {
    // Here you could save the result to the backend
    // createResult({ username: "User", score, total_questions: quizzes.length });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading quiz...</div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">No quizzes found</div>
          <Button onClick={() => navigate("/")}>Go Back</Button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Quiz Complete!</h1>
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-purple-400 mb-2">{score}/{quizzes.length}</div>
            <div className="text-slate-300">
              {score === quizzes.length ? "Perfect Score! 🎉" : 
               score >= quizzes.length * 0.8 ? "Great Job! 👍" :
               score >= quizzes.length * 0.6 ? "Good Effort! 👏" : "Keep Practicing! 💪"}
            </div>
          </div>
          <Button 
            onClick={handleFinishQuiz}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const currentQuiz = quizzes[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuiz?.id];
  const isSubmitted = submitted[currentQuiz?.id];

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Button>
          <div className="text-slate-300">
            Question {currentQuestionIndex + 1} of {quizzes.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quizzes.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-8">{currentQuiz.question}</h2>
            
            <div className="space-y-4 mb-8">
              {currentQuiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !isSubmitted && handleOptionSelect(option)}
                  disabled={isSubmitted}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    userAnswer === option
                      ? isSubmitted
                        ? option === currentQuiz.correct_answer
                          ? "border-green-500 bg-green-500/20"
                          : "border-red-500 bg-red-500/20"
                        : "border-purple-500 bg-purple-500/20"
                      : "border-slate-600 hover:border-slate-500 bg-slate-700/50"
                  } ${isSubmitted ? "cursor-default" : "cursor-pointer hover:bg-slate-700"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white">{option}</span>
                    {isSubmitted && userAnswer === option && (
                      option === currentQuiz.correct_answer ? (
                        <CheckCircle size={20} className="text-green-400" />
                      ) : (
                        <XCircle size={20} className="text-red-400" />
                      )
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              {!isSubmitted ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {currentQuestionIndex === quizzes.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              )}
            </div>

            {/* Feedback */}
            {isSubmitted && (
              <div className="mt-4 p-4 rounded-lg bg-slate-700/50">
                {userAnswer === currentQuiz.correct_answer ? (
                  <div className="text-green-400 font-semibold flex items-center">
                    <CheckCircle size={20} className="mr-2" />
                    Correct! Well done!
                  </div>
                ) : (
                  <div className="text-red-400 font-semibold flex items-center">
                    <XCircle size={20} className="mr-2" />
                    Incorrect. The correct answer is: {currentQuiz.correct_answer}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 