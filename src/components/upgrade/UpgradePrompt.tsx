import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, MessageCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "923436148715";

interface UpgradePromptProps {
  feature?: string;
  compact?: boolean;
}

export function UpgradePrompt({ feature = "this feature", compact = false }: UpgradePromptProps) {
  const whatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi! I'm interested in upgrading to Premium to access ${feature} on Up Scholar. Please share more details.`
  )}`;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border"
      >
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Premium Feature</p>
          <p className="text-xs text-muted-foreground truncate">
            Upgrade to access {feature}
          </p>
        </div>
        <Button size="sm" className="shrink-0 gap-1" asChild>
          <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-3 w-3" />
            Upgrade
          </a>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl">Upgrade to Premium</CardTitle>
          <CardDescription>
            Unlock {feature} and many more advanced features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Unlimited scholarship searches
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              AI-powered document review
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Faculty search & matching
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Priority support
            </li>
          </ul>
          <div className="flex flex-col gap-2 pt-2">
            <Button className="w-full gap-2 bg-gradient-primary hover:opacity-90" asChild>
              <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Upgrade via WhatsApp
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
              <Link to="/pricing">View all plans</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
