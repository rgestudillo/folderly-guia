export interface ProjectData {
  project_name: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
  sustainability_score: {
    score: number;
    rating: string;
    factors: Record<string, number>;
  };
  feasibility_report: {
    status: string;
    key_findings: string[];
    recommendations: string[];
  };
  risk_analysis: Record<string, string>;
  policy_compliance: {
    local_regulations: Array<{
      law_name: string;
      compliance_status: string;
      notes: string;
    }>;
    international_guidelines: Array<{
      treaty: string;
      alignment: string;
      notes: string;
    }>;
  };
  funding_opportunities: Array<{
    name: string;
    amount: string;
    eligibility: string;
    application_deadline: string;
    link: string;
  }>;
  gis_visualization: {
    layers: Array<{
      name: string;
      description: string;
      source: string;
    }>;
  };
  downloadable_reports: Array<{
    name: string;
    format: string;
    url: string;
  }>;
  last_updated: string;
} 