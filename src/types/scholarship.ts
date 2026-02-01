export interface Scholarship {
  id: string;
  name: string;
  description: string;
  amount: number;
  deadline: string;
  eligibility: string;
  field_of_study: string;
  education_level: string;
  country: string;
  gpa_requirement: number | null;
  application_url: string | null;
  provider: string;
  created_at: string;
  updated_at: string;
}

export interface ScholarshipFilters {
  search: string;
  fieldOfStudy: string;
  educationLevel: string;
  country: string;
  minAmount: number | null;
  maxAmount: number | null;
}
