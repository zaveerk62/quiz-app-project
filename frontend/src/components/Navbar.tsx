
import { Button } from "@/components/ui/button";
import { Home, Trophy, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/")}
          >
            QuizMaster
          </h1>
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <Home size={16} />
              <span>Home</span>
            </button>
            <button 
              onClick={() => navigate("/leaderboard")}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <Trophy size={16} />
              <span>Leaderboard</span>
            </button>
            <button 
              onClick={() => navigate("/create-quiz")}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <Plus size={16} />
              <span>Create Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
