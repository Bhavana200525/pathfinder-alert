import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, MapPin, Users, Clock, Sun } from "lucide-react";

const stats = [
  { label: "Safety Score", value: "78%", icon: TrendingUp, color: "text-safe" },
  { label: "Alerts Today", value: "3", icon: TrendingDown, color: "text-warning" },
  { label: "Areas Scanned", value: "12", icon: MapPin, color: "text-primary" },
  { label: "Active Users", value: "1.2K", icon: Users, color: "text-accent" },
];

const heatmapRows = [
  { area: "Downtown Plaza", risk: 85, level: "High" },
  { area: "Park Avenue", risk: 45, level: "Medium" },
  { area: "University Road", risk: 22, level: "Low" },
  { area: "Market Street", risk: 72, level: "High" },
  { area: "Lake Side Walk", risk: 30, level: "Low" },
];

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Safety <span className="text-gradient-primary">Dashboard</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real-time overview of safety conditions in your area.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <s.icon className={`h-6 w-6 ${s.color} mb-2`} />
              <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Heatmap Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <div className="p-5 border-b border-border flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-card-foreground">Area Risk Heatmap</h3>
          </div>
          <div className="divide-y divide-border">
            {heatmapRows.map((r) => (
              <div key={r.area} className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-card-foreground">{r.area}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        r.risk > 70 ? "bg-gradient-danger" : r.risk > 40 ? "bg-warning" : "bg-gradient-safe"
                      }`}
                      style={{ width: `${r.risk}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-mono font-bold ${
                      r.risk > 70 ? "text-danger" : r.risk > 40 ? "text-warning" : "text-safe"
                    }`}
                  >
                    {r.risk}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
