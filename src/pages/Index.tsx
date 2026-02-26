import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RiskAssessment from "@/components/RiskAssessment";
import DashboardPreview from "@/components/DashboardPreview";
import SOSSection from "@/components/SOSSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <RiskAssessment />
      <DashboardPreview />
      <SOSSection />
      <Footer />
    </div>
  );
};

export default Index;
