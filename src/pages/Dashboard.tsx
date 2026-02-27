import { Shield, LogOut, Home } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SafetyMap from "@/components/dashboard/SafetyMap";
import EmergencyContacts from "@/components/dashboard/EmergencyContacts";
import SOSButton from "@/components/dashboard/SOSButton";
import AIRiskAnalysis from "@/components/dashboard/AIRiskAnalysis";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">
              Safety<span className="text-gradient-primary">Sphere</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{user?.email}</span>
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              title="Home"
            >
              <Home className="h-4 w-4" />
            </button>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-foreground">
          Safety <span className="text-gradient-primary">Dashboard</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <SafetyMap />
            <AIRiskAnalysis />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <SOSButton />
            <EmergencyContacts />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
