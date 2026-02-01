import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, DollarSign, GraduationCap, MapPin, ExternalLink } from "lucide-react";
import type { Scholarship } from "@/types/scholarship";
import { format, parseISO, differenceInDays } from "date-fns";

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const deadline = parseISO(scholarship.deadline);
  const daysUntilDeadline = differenceInDays(deadline, new Date());
  const isUrgent = daysUntilDeadline <= 30 && daysUntilDeadline >= 0;
  const isPast = daysUntilDeadline < 0;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight">{scholarship.name}</CardTitle>
            <CardDescription className="text-sm">{scholarship.provider}</CardDescription>
          </div>
          <Badge
            variant={isPast ? "secondary" : isUrgent ? "destructive" : "default"}
            className="shrink-0"
          >
            {isPast
              ? "Closed"
              : isUrgent
              ? `${daysUntilDeadline}d left`
              : scholarship.field_of_study}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {scholarship.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">
              {formatAmount(scholarship.amount)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(deadline, "MMM d, yyyy")}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>{scholarship.education_level}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{scholarship.country}</span>
          </div>
        </div>

        {scholarship.gpa_requirement && (
          <p className="text-xs text-muted-foreground">
            Minimum GPA: <span className="font-medium">{scholarship.gpa_requirement}</span>
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          className="w-full gap-2"
          disabled={isPast}
          onClick={() =>
            scholarship.application_url &&
            window.open(scholarship.application_url, "_blank")
          }
        >
          {isPast ? "Application Closed" : "Apply Now"}
          {!isPast && <ExternalLink className="h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
