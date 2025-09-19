import { Sparkles, BookOpen, Users, Mail, Shield, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 NeuroVia. Built with ❤️ by TechNova for every learning mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
