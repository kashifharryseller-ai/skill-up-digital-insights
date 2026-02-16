export interface AIScholarship {
  name: string;
  university: string;
  country: string;
  level: string;
  eligibility: string;
  funding: string;
  deadline: string;
  url: string;
  intake_cycle?: string;
  source_type?: 'gov' | 'edu' | 'org';
}

export interface AIProfessor {
  name: string;
  title: string;
  university: string;
  department: string;
  research_area: string;
  email?: string;
  profile_url?: string;
  linkedin_url?: string;
  recent_publications?: string[];
  active_projects?: string[];
  summary?: string;
}

export interface AIUniversityData {
  university: string;
  country: string;
  website: string;
  requirements_url?: string;
  min_cgpa?: string;
  notes?: string;
  official_source?: string;
  scholarships: AIScholarship[];
  professors?: AIProfessor[];
}


export interface DocumentReview {
  overall_score: number;
  academic_strength: string;
  language_quality: string;
  structure_analysis: string;
  strategic_recommendations: string[];
  improvement_areas: string[];
}

export interface AISearchResponse {
  universities: AIUniversityData[];
  summary?: string;
  verification_note?: string;
}

export interface BookmarkedItem {
  id: string;
  type: 'university' | 'professor' | 'scholarship';
  data: AIUniversityData | AIProfessor | AIScholarship;
  savedAt: string;
}
