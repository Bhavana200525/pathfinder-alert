import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Phone, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const SOSButton = () => {
  const { user } = useAuth();
  const [active, setActive] = useState(false);
  const [alertId, setAlertId] = useState<string | null>(null);
  const [notified, setNotified] = useState<string[]>([]);

  const triggerSOS = async () => {
    if (!user) return;

    try {
      // Get location
      let lat: number | null = null;
      let lng: number | null = null;
      try {
        const pos = await new Promise<GeolocationPosition>((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
        );
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      } catch {
        // Location unavailable, proceed without it
      }

      // Get contacts
      const { data: contacts } = await supabase
        .from("emergency_contacts")
        .select("name, phone");

      const contactNames = contacts?.map((c) => c.name) || [];

      // Create alert
      const { data: alert, error } = await supabase
        .from("sos_alerts")
        .insert({
          user_id: user.id,
          latitude: lat,
          longitude: lng,
          contacts_notified: contactNames,
          status: "triggered",
        })
        .select()
        .single();

      if (error) throw error;

      setAlertId(alert.id);
      setNotified(contactNames);
      setActive(true);
      toast.warning("🚨 SOS Alert Activated!", {
        description: `${contactNames.length} contacts notified via in-app alert`,
      });
    } catch (err) {
      toast.error("Failed to trigger SOS");
      console.error(err);
    }
  };

  const cancelSOS = async () => {
    if (alertId) {
      await supabase
        .from("sos_alerts")
        .update({ status: "resolved", resolved_at: new Date().toISOString() })
        .eq("id", alertId);
    }
    setActive(false);
    setAlertId(null);
    setNotified([]);
    toast.info("SOS alert cancelled");
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-accent" />
        <h3 className="font-semibold text-card-foreground">Emergency SOS</h3>
      </div>

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Press to share your live location with emergency contacts.
            </p>
            <button
              onClick={triggerSOS}
              className="w-28 h-28 rounded-full bg-gradient-danger text-accent-foreground font-bold text-lg mx-auto block animate-pulse-glow hover:scale-105 transition-transform"
            >
              🚨 SOS
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            <div className="rounded-lg border border-danger/30 bg-danger/10 p-4 text-center">
              <p className="text-danger font-bold text-sm">⚠ SOS ACTIVE</p>
              <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-danger" /> Sharing location
              </div>
            </div>
            {notified.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {notified.map((n) => (
                  <div key={n} className="rounded-lg bg-secondary border border-border p-2 text-center">
                    <p className="text-xs text-muted-foreground">Notified</p>
                    <p className="text-sm font-semibold text-card-foreground">{n}</p>
                    <p className="text-xs text-safe">✓ Sent</p>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={cancelSOS}
              className="w-full flex items-center justify-center gap-2 border border-border bg-secondary px-4 py-2 rounded-lg text-sm text-secondary-foreground hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" /> Cancel SOS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SOSButton;
