
import { Trophy, Medal, Award } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Alex Champion", score: 15200, badge: "🏆" },
  { rank: 2, name: "Sarah Quiz", score: 14800, badge: "🥈" },
  { rank: 3, name: "Mike Brain", score: 14200, badge: "🥉" },
  { rank: 4, name: "Lisa Smart", score: 13900, badge: "🎯" },
  { rank: 5, name: "John Clever", score: 13500, badge: "⭐" },
];

const stats = [
  { label: "Quiz Masters Joined", value: "15.2M", icon: Trophy },
  { label: "Daily Active Players", value: "892", icon: Medal },
  { label: "Average Group Score", value: "47", icon: Award },
];

export const LeaderboardSection = () => {
  return (
    <section className="py-20 bg-slate-800/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Global Leaderboard</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            See how you rank against the best quiz masters from around the world. 
            Climb the ranks and earn your place at the top!
          </p>
        </div>
        
        {/* Top Quiz Masters */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl p-8 mb-12 border border-purple-500/20">
          <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Top Quiz Masters This Month
          </h3>
          
          <div className="space-y-4">
            {leaderboardData.map((player) => (
              <div key={player.rank} className="bg-indigo-600/50 rounded-xl p-4 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                    {player.badge}
                  </div>
                  <div>
                    <h4 className="font-semibold">{player.name}</h4>
                    <p className="text-slate-400 text-sm">Rank #{player.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-purple-400">{player.score.toLocaleString()}</p>
                  <p className="text-slate-400 text-sm">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={32} className="text-white" />
                </div>
                <p className="text-3xl font-bold text-purple-400 mb-2">{stat.value}</p>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
