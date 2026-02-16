import { supabase } from '@/integrations/supabase/client';
import type {
  AISearchResponse,
  AIProfessor,
  
  DocumentReview,
} from '@/types/ai-research';

type AIResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const aiResearchApi = {
  // Search for scholarships
  async searchScholarships(query: string): Promise<AIResponse<AISearchResponse>> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-research', {
        body: { query, type: 'scholarships' },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Search failed' };
    }
  },

  // Search for faculty/professors
  async searchFaculty(
    university: string,
    topic: string
  ): Promise<AIResponse<{ professors: AIProfessor[]; summary?: string }>> {
    try {
      const { data, error } = await supabase.functions.invoke('faculty-search', {
        body: { university, topic },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Search failed' };
    }
  },

  // Review document (SOP, Research Proposal)
  async reviewDocument(
    document: string,
    targetUniversity?: string,
    documentType: 'SOP' | 'Research Proposal' | 'Personal Statement' = 'SOP'
  ): Promise<AIResponse<DocumentReview>> {
    try {
      const { data, error } = await supabase.functions.invoke('document-review', {
        body: { document, targetUniversity, documentType },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Review failed' };
    }
  },
};
