
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Play, Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getCategories, getQuizCollections } from "../lib/api";

type Category = {
  id: number;
  name: string;
};

type QuizCollection = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  category_id: number;
  created_at: string;
  question_count: number;
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "text-green-400 bg-green-400/20";
    case "Medium": return "text-yellow-400 bg-yellow-400/20";
    case "Hard": return "text-red-400 bg-red-400/20";
    default: return "text-slate-400 bg-slate-400/20";
  }
};

export const QuizzesSection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [collectionsByCategory, setCollectionsByCategory] = useState<{ [categoryId: number]: QuizCollection[] }>({});
  const [displayCollections, setDisplayCollections] = useState<QuizCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(6); // Show first 6 quizzes initially

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      loadCollectionsForCategories();
    }
  }, [categories]);

  useEffect(() => {
    updateDisplayCollections();
  }, [collectionsByCategory, searchTerm, displayCount]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCollectionsForCategories = async () => {
    const collectionsData: { [categoryId: number]: QuizCollection[] } = {};
    
    for (const category of categories) {
      try {
        const collections = await getQuizCollections(category.id);
        collectionsData[category.id] = collections;
      } catch (error) {
        console.error(`Failed to load collections for category ${category.id}:`, error);
        collectionsData[category.id] = [];
      }
    }
    
    setCollectionsByCategory(collectionsData);
  };

  const updateDisplayCollections = () => {
    const allCollections: QuizCollection[] = [];
    
    Object.values(collectionsByCategory).forEach(collections => {
      allCollections.push(...collections);
    });

    // Filter by search term
    const filteredCollections = allCollections.filter(collection =>
      collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Limit display count
    setDisplayCollections(filteredCollections.slice(0, displayCount));
  };

  const handleStartQuiz = (collectionId: number) => {
    navigate(`/quiz/${collectionId}`);
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDisplayCount(6); // Reset to first 6 when searching
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-white text-xl">Loading quizzes...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Explore All Quizzes</h2>
          <p className="text-slate-300 mb-8">
            Browse and take quizzes created by the community
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <Input 
              placeholder="Search for quizzes..." 
              className="pl-10 bg-slate-800 border-slate-700 focus:border-purple-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        {displayCollections.length === 0 ? (
          <div className="text-center">
            <div className="text-slate-300 text-xl mb-4">
              {searchTerm ? "No quizzes found matching your search." : "No quizzes available yet."}
            </div>
            {searchTerm && (
              <Button 
                onClick={() => setSearchTerm("")}
                variant="outline"
                className="border-slate-600 text-slate-300"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCollections.map((collection) => (
                <div key={collection.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(collection.difficulty)}`}>
                      {collection.difficulty}
                    </span>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm">4.5</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{collection.title}</h3>
                  <p className="text-slate-400 mb-4">{collection.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-6">
                    <div className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>0 played</span>
                    </div>
                    <span>{collection.question_count} questions</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => handleStartQuiz(collection.id)}
                  >
                    <Play size={16} className="mr-2" />
                    Start Quiz
                  </Button>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            {displayCollections.length >= displayCount && (
              <div className="text-center mt-12">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-600 text-slate-900 hover:text-white hover:bg-slate-800"
                  onClick={handleLoadMore}
                >
                  Load More Quizzes
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
