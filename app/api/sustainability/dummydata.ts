import { ProjectData } from "@/types/project";

    // For now, return dummy data instead of making API calls
    export const dummyData: ProjectData = {
      project_name: "Mangrove Restoration in Lapu-Lapu City",
      location: {
        latitude: 123, 
        longitude: 123,
        city: "Lapu-Lapu City",
        country: "Philippines"
      },
      sustainability_score: {
        score: 87,
        rating: "High",
        factors: {
          environmental_impact: 90,
          climate_risk: 80,
          policy_compliance: 85,
          biodiversity_benefit: 95
        }
      },
      feasibility_report: {
        status: "Feasible",
        key_findings: [
          "The site is classified as a coastal zone with ideal conditions for mangrove restoration.",
          "Minimal pollution detected in surrounding waters (PM2.5: 12 µg/m³, Water Quality Index: 85).",
          "No legal restrictions or zoning conflicts for mangrove restoration."
        ],
        recommendations: [
          "Use Rhizophora spp. as they have high survival rates in this area.",
          "Involve local communities for long-term sustainability.",
          "Apply for government grants from the Department of Environment and Natural Resources (DENR)."
        ]
      },
      risk_analysis: {
        flood_risk: "Moderate",
        earthquake_risk: "Low",
        pollution_level: "Low",
        biodiversity_threats: "None detected",
        climate_risk: "Increasing typhoon frequency (Projected: +10% over next 10 years)"
      },
      policy_compliance: {
        local_regulations: [
          {
            law_name: "Philippine Fisheries Code (RA 8550)",
            compliance_status: "Compliant",
            notes: "Project aligns with marine habitat protection policies."
          },
          {
            law_name: "Environmental Impact Assessment (EIA) Requirement",
            compliance_status: "Not Required",
            notes: "Project does not exceed land conversion thresholds requiring EIA."
          }
        ],
        international_guidelines: [
          {
            treaty: "UN Sustainable Development Goal 14 (Life Below Water)",
            alignment: "Strong",
            notes: "Mangrove restoration contributes to marine biodiversity conservation."
          }
        ]
      },
      funding_opportunities: [
        {
          name: "Green Climate Fund Grant",
          amount: "$50,000",
          eligibility: "Available for community-led coastal restoration projects",
          application_deadline: "December 31, 2025",
          link: "https://www.greenclimate.fund/"
        },
        {
          name: "DENR Coastal Rehabilitation Program",
          amount: "₱2,000,000",
          eligibility: "Local government and NGOs",
          application_deadline: "Open year-round",
          link: "https://www.denr.gov.ph/"
        }
      ],
      gis_visualization: {
        layers: [
          {
            name: "Air Quality",
            description: "PM2.5 levels: 12 µg/m³ (Good)",
            source: "OpenAQ API"
          },
          {
            name: "Water Quality",
            description: "Water Quality Index: 85 (Safe for ecosystem restoration)",
            source: "NOAA Ocean Data API"
          },
          {
            name: "Flood Risk Zones",
            description: "Moderate risk (50-year flood projection)",
            source: "NASA FIRMS API"
          }
        ]
      },
      downloadable_reports: [
        {
          name: "Feasibility Report",
          format: "PDF",
          url: "https://guia.com/reports/mangrove_feasibility_lapu-lapu.pdf"
        },
        {
          name: "Risk Assessment",
          format: "PDF",
          url: "https://guia.com/reports/mangrove_risk_lapu-lapu.pdf"
        }
      ],
      last_updated: "2025-03-01T14:30:00Z"
    };