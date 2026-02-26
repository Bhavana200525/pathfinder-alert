import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

type RiskLevel = "low" | "medium" | "high" | null;

const RiskAssessment = () => {
  const [time, setTime] = useState("evening");
  const [location, setLocation] = useState("urban");
  const [crowd, setCrowd] = useState("moderate");
  const [lighting, setLighting] = useState("dim");
  const [result, setResult] = useState<RiskLevel>(null);
  const [score, setScore] = useState(0);

  const calculate = () => {
    const weights = {
      time: { morning: 1, afternoon: 1, evening: 3, night: 5 },
      location: { residential: 1, urban: 2, suburban: 3, isolated: 5 },
      crowd: { crowded: 1, moderate: 2, sparse: 4, empty: 5 },
      lighting: { bright: 1, moderate: 2, dim: 4, dark: 5 },
    };

    const raw =
      (weights.time as any)[time] * 0.3 +
      (weights.location as any)[location] * 0.25 +
      (weights.crowd as any)[crowd] * 0.25 +
      (weights.lighting as any)[lighting] * 0.2;

    const normalized = Math.min(Math.round((raw / 5) * 100), 100);
    setScore(normalized);
    setResult(normalized < 35 ? "low" : normalized < 65 ? "medium" : "high");
  };

  const selectClass = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
      active
        ? "border-primary bg-primary/15 text-primary"
        : "border-border bg-secondary text-secondary-foreground hover:border-muted-foreground"
    }`;

  const resultConfig = {
    low: { icon: CheckCircle, label: "Low Risk", cls: "text-safe border-safe/30 bg-safe/10" },
    medium: { icon: AlertTriangle, label: "Medium Risk", cls: "text-warning border-warning/30 bg-warning/10" },
    high: { icon: XCircle, label: "High Risk", cls: "text-danger border-danger/30 bg-danger/10" },
  };

  return (
    <section id="risk-assessment" className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            AI <span className="text-gradient-primary">Risk Assessment</span>
          </h2>
          <p className="text-muted-foreground">
            Enter your current conditions and our AI model will predict your safety risk level.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-border bg-card p-8 space-y-6"
        >
          {/* Time */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-3 block">🕐 Time of Day</label>
            <div className="flex flex-wrap gap-2">
              {["morning", "afternoon", "evening", "night"].map((v) => (
                <button key={v} className={selectClass(time === v)} onClick={() => setTime(v)}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-3 block">📍 Location Type</label>
            <div className="flex flex-wrap gap-2">
              {["residential", "urban", "suburban", "isolated"].map((v) => (
                <button key={v} className={selectClass(location === v)} onClick={() => setLocation(v)}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Crowd */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-3 block">👥 Crowd Density</label>
            <div className="flex flex-wrap gap-2">
              {["crowded", "moderate", "sparse", "empty"].map((v) => (
                <button key={v} className={selectClass(crowd === v)} onClick={() => setCrowd(v)}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Lighting */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-3 block">💡 Lighting Conditions</label>
            <div className="flex flex-wrap gap-2">
              {["bright", "moderate", "dim", "dark"].map((v) => (
                <button key={v} className={selectClass(lighting === v)} onClick={() => setLighting(v)}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-lg font-semibold glow-primary hover:opacity-90 transition-opacity"
          >
            <Shield className="inline h-5 w-5 mr-2 -mt-0.5" />
            Analyze Safety Risk
          </button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`rounded-xl border p-6 text-center ${resultConfig[result].cls}`}
              >
                {(() => {
                  const Icon = resultConfig[result].icon;
                  return <Icon className="h-12 w-12 mx-auto mb-3" />;
                })()}
                <h3 className="text-2xl font-bold mb-1">{resultConfig[result].label}</h3>
                <p className="text-4xl font-mono font-bold mb-2">{score}%</p>
                <p className="text-sm opacity-80">
                  {result === "low" && "Conditions appear safe. Stay aware of your surroundings."}
                  {result === "medium" && "Exercise caution. Consider safer route alternatives."}
                  {result === "high" && "High risk detected. Avoid this area or activate SOS."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default RiskAssessment;
