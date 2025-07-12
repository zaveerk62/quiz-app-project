
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                QuizMaster!
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg">
              A comprehensive quiz platform. Play, create, and compete!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-lg px-8 py-6 border-0">
              <Play size={20} className="mr-2" />
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-slate-600 text-slate-900 hover:text-white hover:bg-slate-700/50 hover:border-slate-500 backdrop-blur-sm transition-all duration-300 text-lg px-8 py-6">
              Learn more
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="hidden lg:block">
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 rounded-3xl p-8 backdrop-blur-sm border border-slate-600/30 shadow-2xl">
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 space-y-4 border border-slate-600/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Question 1/5</span>
                  <span className="text-sm text-blue-400 flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    LIVE
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">Which soccer team won the FIFA World Cup for the first time in 2018?</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-400/20 border border-green-400/30 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-white">A. Uruguay</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 text-slate-300">B. Brazil</div>
                  <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 text-slate-300">C. Italy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
