import { motion } from "framer-motion";
import { Shield, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-8">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Safety Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-foreground">Predict.</span>{" "}
            <span className="text-gradient-primary">Prevent.</span>{" "}
            <span className="text-foreground">Protect.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
            SafetySphere uses AI to predict risk levels, suggest safer routes, and enable
            instant emergency response — shifting safety from reaction to prevention.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard"
              className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold glow-primary hover:opacity-90 transition-opacity"
            >
              Go to Dashboard
            </a>
            <a
              href="#features"
              className="border border-border bg-secondary px-8 py-3 rounded-lg font-semibold text-secondary-foreground hover:bg-muted transition-colors"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
