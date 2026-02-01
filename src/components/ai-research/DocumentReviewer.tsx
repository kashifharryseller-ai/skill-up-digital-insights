import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { aiResearchApi } from "@/lib/api/ai-research";
import type { DocumentReview } from "@/types/ai-research";
import {
  FileText,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  AlertCircle,
} from "lucide-react";

export function DocumentReviewer() {
  const { toast } = useToast();
  const [document, setDocument] = useState("");
  const [targetUniversity, setTargetUniversity] = useState("");
  const [documentType, setDocumentType] = useState<'SOP' | 'Research Proposal' | 'Personal Statement'>('SOP');
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState<DocumentReview | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReview = async () => {
    if (!document.trim()) {
      toast({
        title: "Missing Document",
        description: "Please paste your document content",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setReview(null);

    try {
      const response = await aiResearchApi.reviewDocument(document, targetUniversity, documentType);

      if (response.success && response.data) {
        setReview(response.data);
        toast({
          title: "Review Complete",
          description: `Overall Score: ${response.data.overall_score}/100`,
        });
      } else {
        setError(response.error || "Review failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          AI Document Reviewer
        </h3>
        <p className="text-sm text-muted-foreground">
          Get AI-powered feedback on your Statement of Purpose, Research Proposal, or Personal Statement.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Type</label>
            <Select value={documentType} onValueChange={(v: any) => setDocumentType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOP">Statement of Purpose (SOP)</SelectItem>
                <SelectItem value="Research Proposal">Research Proposal</SelectItem>
                <SelectItem value="Personal Statement">Personal Statement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Target University (Optional)</label>
            <Input
              value={targetUniversity}
              onChange={(e) => setTargetUniversity(e.target.value)}
              placeholder="e.g., MIT, Stanford..."
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Paste Your Document</label>
          <Textarea
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            placeholder="Paste your Statement of Purpose, Research Proposal, or Personal Statement here..."
            rows={10}
            disabled={isLoading}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            {document.length} characters • Recommended: 500-1000 words for best feedback
          </p>
        </div>

        <Button
          onClick={handleReview}
          disabled={isLoading || !document.trim()}
          className="bg-gradient-primary hover:opacity-90 gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <Target className="h-4 w-4" /> Get AI Review
            </>
          )}
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Review Results */}
      {review && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Score Card */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Overall Score</h4>
              <span className={`text-4xl font-bold ${getScoreColor(review.overall_score)}`}>
                {review.overall_score}/100
              </span>
            </div>
            <Progress value={review.overall_score} className="h-3" />
          </div>

          {/* Analysis Sections */}
          <div className="grid gap-4 md:grid-cols-3">
            {review.academic_strength && (
              <div className="p-4 rounded-xl bg-card border border-border">
                <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Academic Strength
                </h5>
                <p className="text-sm text-muted-foreground">{review.academic_strength}</p>
              </div>
            )}

            {review.language_quality && (
              <div className="p-4 rounded-xl bg-card border border-border">
                <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-info" />
                  Language Quality
                </h5>
                <p className="text-sm text-muted-foreground">{review.language_quality}</p>
              </div>
            )}

            {review.structure_analysis && (
              <div className="p-4 rounded-xl bg-card border border-border">
                <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Structure
                </h5>
                <p className="text-sm text-muted-foreground">{review.structure_analysis}</p>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {review.strategic_recommendations && review.strategic_recommendations.length > 0 && (
            <div className="p-6 rounded-2xl bg-success/5 border border-success/20">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-success" />
                Strategic Recommendations
              </h4>
              <ul className="space-y-2">
                {review.strategic_recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvement Areas */}
          {review.improvement_areas && review.improvement_areas.length > 0 && (
            <div className="p-6 rounded-2xl bg-warning/5 border border-warning/20">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Areas for Improvement
              </h4>
              <ul className="space-y-2">
                {review.improvement_areas.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && !review && !error && (
        <div className="py-12 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <h4 className="font-semibold mb-2">Document Reviewer</h4>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Get expert AI feedback on your application documents. Paste your SOP or proposal
            to receive detailed analysis and improvement suggestions.
          </p>
        </div>
      )}
    </div>
  );
}
