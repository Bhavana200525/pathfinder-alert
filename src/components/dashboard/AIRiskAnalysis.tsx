import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type RiskLevel = "low" | "medium" | "high" | null;

interface AIResult {
  risk_score: number;
  risk_level: string;
  analysis: string;
  recommendations: string[];
  route_suggestion: string;
}

const AIRiskAnalysis = () => {
  const [time, setTime] = useState("evening");
  const [location, setLocation] = useState("urban");
  const [crowd, setCrowd] = useState("moderate");
  const [lighting, setLighting] = useState("dim");
  const [originAddress, setOriginAddress] = useState("");
  const [destAddress, setDestAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);

  const selectClass = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
      active
        ? "border-primary bg-primary/15 text-primary"
        : "border-border bg-secondary text-secondary-foreground hover:border-muted-foreground"
    }`;

  const analyze = async () => {
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-risk", {
        body: { time, location, crowd, lighting, originAddress: originAddress || undefined, destAddress: destAddress || undefined },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setResult(data);
    } catch (err: any) {
      toast.error(err?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const riskLevel: RiskLevel = result ? (result.risk_level as RiskLevel) : null;

  const resultConfig = {
    low: { icon: CheckCircle, label: "Low Risk", cls: "text-safe border-safe/30 bg-safe/10" },
    medium: { icon: AlertTriangle, label: "Medium Risk", cls: "text-warning border-warning/30 bg-warning/10" },
    high: { icon: XCircle, label: "High Risk", cls: "text-danger border-danger/30 bg-danger/10" },
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-card-foreground">AI Risk Analysis</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Time of Day</label>
          <div className="flex flex-wrap gap-1.5">
            {["morning", "afternoon", "evening", "night"].map((v) => (
              <button key={v} className={selectClass(time === v)} onClick={() => setTime(v)}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Location Type</label>
          <div className="flex flex-wrap gap-1.5">
            {["residential", "urban", "suburban", "isolated"].map((v) => (
              <button key={v} className={selectClass(location === v)} onClick={() => setLocation(v)}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Crowd Density</label>
          <div className="flex flex-wrap gap-1.5">
            {["crowded", "moderate", "sparse", "empty"].map((v) => (
              <button key={v} className={selectClass(crowd === v)} onClick={() => setCrowd(v)}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Lighting</label>
          <div className="flex flex-wrap gap-1.5">
            {["bright", "moderate", "dim", "dark"].map((v) => (
              <button key={v} className={selectClass(lighting === v)} onClick={() => setLighting(v)}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Origin (optional)</label>
            <input
              type="text"
              value={originAddress}
              onChange={(e) => setOriginAddress(e.target.value)}
              placeholder="e.g. 123 Main St"
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Destination (optional)</label>
            <input
              type="text"
              value={destAddress}
              onChange={(e) => setDestAddress(e.target.value)}
              placeholder="e.g. 456 Oak Ave"
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <button
          onClick={analyze}
          disabled={loading}
          className="w-full bg-gradient-primary text-primary-foreground py-2.5 rounded-lg font-semibold text-sm glow-primary hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="inline h-4 w-4 mr-1 animate-spin" /> Analyzing...</>
          ) : (
            <><Shield className="inline h-4 w-4 mr-1 -mt-0.5" /> Analyze with AI</>
          )}
        </button>

        <AnimatePresence>
          {result && riskLevel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`rounded-xl border p-5 ${resultConfig[riskLevel].cls}`}
            >
              {(() => {
                const Icon = resultConfig[riskLevel].icon;
                return <Icon className="h-8 w-8 mx-auto mb-2" />;
              })()}
              <h4 className="text-lg font-bold text-center">{resultConfig[riskLevel].label}</h4>
              <p className="text-2xl font-mono font-bold text-center mb-2">{result.risk_score}%</p>
              <p className="text-sm opacity-90 mb-3">{result.analysis}</p>
              {result.recommendations?.length > 0 && (
                <ul className="space-y-1 text-xs opacity-80">
                  {result.recommendations.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              )}
              {result.route_suggestion && (
                <p className="text-xs mt-2 opacity-70 italic">💡 {result.route_suggestion}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIRiskAnalysis;
