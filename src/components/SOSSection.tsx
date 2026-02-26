import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, AlertTriangle } from "lucide-react";

const SOSSection = () => {
  const [triggered, setTriggered] = useState(false);

  return (
    <section id="sos" className="py-24">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AlertTriangle className="h-12 w-12 text-accent mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Emergency <span className="text-gradient-primary">SOS</span>
          </h2>
          <p className="text-muted-foreground mb-10">
            In an emergency, press the button below to instantly share your live location with
            your emergency contacts and trigger alert notifications.
          </p>

          <AnimatePresence mode="wait">
            {!triggered ? (
              <motion.button
                key="sos-btn"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={() => setTriggered(true)}
                className="relative w-40 h-40 rounded-full bg-gradient-danger text-accent-foreground font-bold text-2xl mx-auto block animate-pulse-glow hover:scale-105 transition-transform"
              >
                🚨 SOS
              </motion.button>
            ) : (
              <motion.div
                key="sos-active"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-danger/30 bg-danger/10 p-8 space-y-4"
              >
                <div className="text-danger text-lg font-bold">⚠ SOS ACTIVATED</div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-danger" />
                  Sharing live location...
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-danger" />
                  Alerting emergency contacts...
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {["Mom", "Dad", "Friend"].map((c) => (
                    <div key={c} className="rounded-lg bg-card border border-border p-3">
                      <p className="text-xs text-muted-foreground">Notifying</p>
                      <p className="text-sm font-semibold text-card-foreground">{c}</p>
                      <p className="text-xs text-safe">✓ Sent</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setTriggered(false)}
                  className="mt-4 border border-border bg-secondary px-6 py-2 rounded-lg text-sm text-secondary-foreground hover:bg-muted transition-colors"
                >
                  Cancel SOS
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SOSSection;
