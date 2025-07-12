
import { Zap, Users, Award } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Why Choose QuizMaster?</h2>
        <p className="text-slate-300 mb-16 max-w-2xl mx-auto">
          Experience the future of online learning with our cutting-edge features
          designed to make quizzing fun and effective.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-colors">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Zap size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
            <p className="text-slate-400">Real-time responses and instant feedback to keep you engaged and learning.</p>
          </div>
          
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-colors">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Users size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Multiplayer</h3>
            <p className="text-slate-400">Compete with friends and players worldwide in real-time quiz battles.</p>
          </div>
          
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-colors">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Award size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Achievement System</h3>
            <p className="text-slate-400">Earn badges, climb leaderboards, and track your progress over time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
