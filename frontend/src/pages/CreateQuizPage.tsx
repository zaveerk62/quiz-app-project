import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { getCategories, createQuizCollection } from "../lib/api";

type Category = {
  id: number;
  name: string;
};

type Question = {
  question: string;
  options: string[];
  correct_answer: string;
};

type QuizForm = {
  title: string;
  description: string;
  difficulty: string;
  category_id: number;
  questions: Question[];
};

export const CreateQuizPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<QuizForm>({
    title: "",
    description: "",
    difficulty: "Medium",
    category_id: 0,
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correct_answer: ""
      }
    ]
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, category_id: data[0].id }));
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleInputChange = (field: keyof QuizForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex 
          ? { 
              ...q, 
              options: q.options.map((opt, j) => j === optionIndex ? value : opt)
            }
          : q
      )
    }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correct_answer: ""
        }
      ]
    }));
  };

  const removeQuestion = (index: number) => {
    if (formData.questions.length > 1) {
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = (): string | null => {
    if (!formData.title.trim()) return "Quiz title is required";
    if (!formData.description.trim()) return "Quiz description is required";
    if (!formData.category_id) return "Please select a category";
    
    for (let i = 0; i < formData.questions.length; i++) {
      const q = formData.questions[i];
      if (!q.question.trim()) return `Question ${i + 1} is required`;
      if (q.options.some(opt => !opt.trim())) return `All options for question ${i + 1} are required`;
      if (!q.correct_answer) return `Please select correct answer for question ${i + 1}`;
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    setLoading(true);
    
    try {
      // Create the quiz collection with all questions
      await createQuizCollection({
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        category_id: formData.category_id,
        questions: formData.questions
      });
      
      alert("Quiz created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to create quiz:", error);
      alert("Failed to create quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-slate-900 hover:text-white"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-white">Create New Quiz</h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Quiz Details Card */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Quiz Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter quiz title..."
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your quiz..."
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category *
                  </label>
                  <Select
                    value={formData.category_id.toString()}
                    onValueChange={(value) => handleInputChange("category_id", parseInt(value))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Difficulty
                  </label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => handleInputChange("difficulty", value)}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Questions</h2>
              <Button
                type="button"
                onClick={addQuestion}
                variant="outline"
                className="border-slate-600 text-slate-900 hover:text-white"
              >
                <Plus size={16} className="mr-2" />
                Add Question
              </Button>
            </div>

            {formData.questions.map((question, questionIndex) => (
              <Card key={questionIndex} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Question {questionIndex + 1}</CardTitle>
                    {formData.questions.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeQuestion(questionIndex)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Question *
                    </label>
                    <Textarea
                      value={question.question}
                      onChange={(e) => handleQuestionChange(questionIndex, "question", e.target.value)}
                      placeholder="Enter your question..."
                      className="bg-slate-700 border-slate-600 text-white"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Options *
                    </label>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-3">
                          <Input
                            value={option}
                            onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                          <input
                            type="radio"
                            name={`correct-${questionIndex}`}
                            value={option}
                            checked={question.correct_answer === option}
                            onChange={(e) => handleQuestionChange(questionIndex, "correct_answer", e.target.value)}
                            className="accent-purple-500"
                          />
                          <span className="text-sm text-slate-400">Correct</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Save size={16} className="mr-2" />
              {loading ? "Creating Quiz..." : "Create Quiz"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}; 