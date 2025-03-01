export interface ProjectData {
  project_name: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    images: string[];
  };
  sustainability_score: {
    score: number;
    rating: string;
    explanation: string;
    factors: {
      environmental_impact: {
        value: number;
        explanation: string;
      };
      climate_risk: {
        value: number;
        explanation: string;
      };
      policy_compliance: {
        value: number;
        explanation: string;
      };
      biodiversity_benefit: {
        value: number;
        explanation: string;
      };
      [key: string]: {
        value: number;
        explanation: string;
      };
    };
  };
  feasibility_report: {
    status: string;
    key_findings: string[];
    recommendations: string[];
  };
  risk_analysis: {
    flood_risk_level: {
      value: string;
      explanation: string;
    };
    earthquake_risk_level: {
      value: string;
      explanation: string;
    };
    pollution_level: {
      value: string;
      explanation: string;
    };
    biodiversity_threats: {
      value: string;
      explanation: string;
    };
    climate_risk_summary: {
      value: string;
      explanation: string;
    };
    [key: string]: {
      value: string;
      explanation: string;
    };
  };
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
  last_updated?: string;
} 