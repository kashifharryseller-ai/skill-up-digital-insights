import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { ScholarshipFilters as Filters } from "@/types/scholarship";

interface ScholarshipFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  options: {
    fields: string[];
    levels: string[];
    countries: string[];
  };
}

export function ScholarshipFilters({
  filters,
  onFiltersChange,
  options,
}: ScholarshipFiltersProps) {
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      fieldOfStudy: "all",
      educationLevel: "all",
      country: "all",
      minAmount: null,
      maxAmount: null,
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.fieldOfStudy !== "all" ||
    filters.educationLevel !== "all" ||
    filters.country !== "all" ||
    filters.minAmount !== null ||
    filters.maxAmount !== null;

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Find Scholarships</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground"
          >
            <X className="mr-1 h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search scholarships, providers..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Field of Study</label>
          <Select
            value={filters.fieldOfStudy}
            onValueChange={(v) => updateFilter("fieldOfStudy", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All fields" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All fields</SelectItem>
              {options.fields.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Education Level</label>
          <Select
            value={filters.educationLevel}
            onValueChange={(v) => updateFilter("educationLevel", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              {options.levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Country</label>
          <Select
            value={filters.country}
            onValueChange={(v) => updateFilter("country", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              {options.countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount Range</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minAmount ?? ""}
              onChange={(e) =>
                updateFilter(
                  "minAmount",
                  e.target.value ? Number(e.target.value) : null
                )
              }
              className="w-full"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxAmount ?? ""}
              onChange={(e) =>
                updateFilter(
                  "maxAmount",
                  e.target.value ? Number(e.target.value) : null
                )
              }
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
