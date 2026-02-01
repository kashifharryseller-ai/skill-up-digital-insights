import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { aiResearchApi } from "@/lib/api/ai-research";
import type { HecRecognition } from "@/types/ai-research";
import {
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Shield,
  AlertCircle,
} from "lucide-react";

export function HecVerification() {
  const { toast } = useToast();
  const [university, setUniversity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HecRecognition | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!university.trim()) {
      toast({
        title: "Missing Field",
        description: "Please enter a university name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await aiResearchApi.checkHecRecognition(university);

      if (response.success && response.data) {
        setResult(response.data);
        toast({
          title: "Verification Complete",
          description: `Status: ${response.data.status}`,
        });
      } else {
        setError(response.error || "Verification failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Recognized':
        return <CheckCircle2 className="h-6 w-6 text-success" />;
      case 'Not Recognized':
        return <XCircle className="h-6 w-6 text-destructive" />;
      case 'Conditional':
        return <AlertTriangle className="h-6 w-6 text-warning" />;
      default:
        return <Shield className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recognized':
        return 'bg-success/10 text-success border-success/30';
      case 'Not Recognized':
        return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'Conditional':
        return 'bg-warning/10 text-warning border-warning/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          HEC Pakistan Recognition Check
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Verify if a foreign university is recognized by the Higher Education Commission (HEC) of Pakistan.
        </p>
        <div className="flex gap-3">
          <Input
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            placeholder="Enter university name (e.g., University of Oxford)"
            className="flex-1"
            disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          />
          <Button
            onClick={handleCheck}
            disabled={isLoading || !university.trim()}
            className="bg-gradient-primary hover:opacity-90 gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Checking...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" /> Verify
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-2xl border-2 ${getStatusColor(result.status)}`}
        >
          <div className="flex items-start gap-4">
            {getStatusIcon(result.status)}
            <div className="flex-1 space-y-4">
              <div>
                <h4 className="text-xl font-bold">{result.university}</h4>
                <p className="text-sm opacity-80">{result.country}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className={getStatusColor(result.status)}>
                  {result.status}
                </Badge>
                {result.category && (
                  <Badge variant="outline">Category: {result.category}</Badge>
                )}
              </div>

              <div className="pt-4 border-t border-current/20">
                <h5 className="text-sm font-semibold mb-2">Verification Details</h5>
                <p className="text-sm opacity-90">{result.verification_details}</p>
              </div>

              {result.warning_notes && (
                <div className="p-4 rounded-xl bg-background/50 border border-current/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-semibold mb-1">Important Notice</h5>
                      <p className="text-sm opacity-80">{result.warning_notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && !result && !error && (
        <div className="py-12 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h4 className="font-semibold mb-2">Accreditation Verification</h4>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Check if a foreign university's degree will be recognized by HEC Pakistan
            before applying.
          </p>
        </div>
      )}
    </div>
  );
}
