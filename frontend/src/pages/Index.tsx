
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { LeaderboardSection } from "@/components/LeaderboardSection";
import { QuizzesSection } from "@/components/QuizzesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <LeaderboardSection />
      <QuizzesSection />
      <Footer />
    </div>
  );
};

export default Index;
