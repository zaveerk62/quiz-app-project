
import { Github, Twitter, Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              QuizMaster
            </h3>
            <p className="text-slate-400">
              The ultimate quiz platform for learning, competing, and having fun with quizzes and trivia of learners worldwide and millions of quizzes.
            </p>
            <div className="flex space-x-4">
              <Github className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <div className="space-y-2 text-slate-400">
              <a href="#" className="block hover:text-white transition-colors">Take Quiz</a>
              <a href="#" className="block hover:text-white transition-colors">Create Quiz</a>
              <a href="#" className="block hover:text-white transition-colors">Leaderboard</a>
              <a href="#" className="block hover:text-white transition-colors">Categories</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2 text-slate-400">
              <a href="#" className="block hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-slate-400">
              <a href="#" className="block hover:text-white transition-colors">About Us</a>
              <a href="#" className="block hover:text-white transition-colors">Careers</a>
              <a href="#" className="block hover:text-white transition-colors">Blog</a>
              <a href="#" className="block hover:text-white transition-colors">Press</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
          <p>© 2024 QuizMaster. All rights reserved. Made with ❤️ by learners worldwide.</p>
        </div>
      </div>
    </footer>
  );
};
