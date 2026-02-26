import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-bold text-foreground">SafetySphere</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Predict. Prevent. Protect. — AI-powered safety for everyone.
      </p>
    </div>
  </footer>
);

export default Footer;
