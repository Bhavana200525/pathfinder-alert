import { motion } from "framer-motion";
import { Brain, Map, Route, Phone, Bot, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Risk Prediction",
    description: "Analyzes time, location, lighting, and crowd density to generate real-time safety scores.",
    color: "text-primary",
  },
  {
    icon: Map,
    title: "Unsafe Area Heatmap",
    description: "Visualizes risk-prone zones so you can make informed travel decisions.",
    color: "text-accent",
  },
  {
    icon: Route,
    title: "Safe Route Suggestion",
    description: "Suggests safer alternative paths that avoid high-risk areas.",
    color: "text-safe",
  },
  {
    icon: Phone,
    title: "Emergency SOS",
    description: "Instantly shares live location with contacts and triggers alert notifications.",
    color: "text-danger",
  },
  {
    icon: Bot,
    title: "AI Safety Assistant",
    description: "Provides real-time safety tips and guidance during emergencies.",
    color: "text-primary",
  },
  {
    icon: BarChart3,
    title: "Risk Analytics",
    description: "Tracks safety patterns and provides insights to improve your daily routines.",
    color: "text-warning",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Intelligent <span className="text-gradient-primary">Safety Features</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A comprehensive ecosystem of AI-powered tools designed to keep you safe.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <f.icon className={`h-10 w-10 ${f.color} mb-4`} />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
