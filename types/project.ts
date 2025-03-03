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
    weights: {
      "Climate & Weather Data": {
        weight: number;
        justification: string;
      };
      "Air Quality & Pollution": {
        weight: number;
        justification: string;
      };
      "Disaster Risk & Hazard Data": {
        weight: number;
        justification: string;
      };
      "Biodiversity & Ecosystem Health": {
        weight: number;
        justification: string;
      };
      "Renewable Energy & Infrastructure Feasibility": {
        weight: number;
        justification: string;
      };
    };
    scores: {
      "Climate & Weather Data": {
        raw_score: number;
        weighted_score: number;
        metrics?: Record<string, number>;
      };
      "Air Quality & Pollution": {
        raw_score: number;
        weighted_score: number;
        metrics?: Record<string, number>;
      };
      "Disaster Risk & Hazard Data": {
        raw_score: number;
        weighted_score: number;
        metrics?: Record<string, number>;
      };
      "Biodiversity & Ecosystem Health": {
        raw_score: number;
        weighted_score: number;
        metrics?: Record<string, number>;
      };
      "Renewable Energy & Infrastructure Feasibility": {
        raw_score: number;
        weighted_score: number;
        metrics?: Record<string, number>;
      };
    };
    overall_score: number;
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
  api_context_data: {
    api: Array<{
      name: string;
      summary: string;
      source: string;
    }>;
  };
  last_updated?: string;
} 