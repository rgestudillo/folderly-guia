import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { ProjectData } from "@/types/project";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
  },
  titleContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#166534",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 24,
    color: "#166534",
    marginBottom: 30,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    borderBottomStyle: "solid",
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#166534",
    borderLeftWidth: 4,
    borderLeftColor: "#166534",
    paddingLeft: 10,
  },
  subsectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: "#047857",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 8,
    paddingLeft: 15,
  },
  badge: {
    fontSize: 12,
    padding: 4,
    backgroundColor: "#f0fdf4",
    borderRadius: 4,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  footer: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
    marginTop: 20,
  },
  // Research report styles
  reportHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#1e3a8a',
    textTransform: 'uppercase',
    borderBottomWidth: 2,
    borderBottomColor: '#1e3a8a',
    paddingBottom: 5,
  },
  reportSubheader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e3a8a',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 3,
  },
  reportText: {
    fontSize: 11,
    marginBottom: 8,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  reportTextBold: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reportTextItalic: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  reportTable: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#94a3b8',
  },
  reportTableHeader: {
    backgroundColor: '#f1f5f9',
    borderBottomWidth: 1,
    borderBottomColor: '#94a3b8',
    padding: 5,
    flexDirection: 'row',
  },
  reportTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    padding: 5,
  },
  reportTableCell: {
    flex: 1,
    padding: 4,
    fontSize: 10,
  },
  reportTableHeaderCell: {
    flex: 1,
    padding: 4,
    fontSize: 10,
    fontWeight: 'bold',
  },
  reportNote: {
    fontSize: 9,
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 10,
    color: '#64748b',
  },
  reportCitation: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 5,
  },
  reportFigure: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  reportFigureCaption: {
    fontSize: 9,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
    color: '#64748b',
  },
  reportHighlight: {
    backgroundColor: '#f0fdf4',
    padding: 8,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#166534',
  },
  reportWarning: {
    backgroundColor: '#fff7ed',
    padding: 8,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#c2410c',
  },
  reportBullet: {
    fontSize: 11,
    marginBottom: 5,
    paddingLeft: 15,
    lineHeight: 1.4,
  },
  reportPageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 10,
    color: '#64748b',
  },
});

interface ProjectReportPDFProps {
  projectData: ProjectData;
}

export function ProjectReportPDF({ projectData }: ProjectReportPDFProps) {
  // Helper function to get SDG alignment text based on score
  const getSDGAlignmentText = (score: number) => {
    if (score >= 8) return "Strong alignment with multiple SDGs";
    if (score >= 6) return "Moderate alignment with several SDGs";
    if (score >= 4) return "Basic alignment with some SDGs";
    return "Limited alignment with SDGs";
  };

  // Helper function to get risk level text
  const getRiskLevelText = (score: number) => {
    if (score >= 8) return "Low Risk";
    if (score >= 6) return "Moderate Risk";
    if (score >= 4) return "Elevated Risk";
    return "High Risk";
  };

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{projectData.project_name}</Text>
          <Text style={styles.subtitle}>Sustainability Assessment Report</Text>
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={styles.infoText}>
            Location: {projectData.location.city}, {projectData.location.country}
          </Text>
          <Text style={styles.infoText}>
            Coordinates: {projectData.location.latitude}, {projectData.location.longitude}
          </Text>
          <Text style={styles.infoText}>
            Report Date: {new Date().toLocaleDateString()}
          </Text>
        </View>

        <View style={{ marginTop: 40, marginBottom: 20 }}>
          <Text style={[styles.reportText, { textAlign: 'center' }]}>
            This comprehensive sustainability assessment has been conducted in accordance with
            international frameworks including the United Nations Sustainable Development Goals,
            IPCC Climate Risk Assessment methodologies, and ISO 14001 Environmental Management Systems.
          </Text>
        </View>

        <View style={styles.reportFigure}>
          <Text style={styles.reportFigureCaption}>
            Overall Sustainability Score: {projectData.sustainability_score.overall_score.toFixed(1)}/10.0
          </Text>
        </View>

        <Text style={styles.footer}>
          Last Updated: {projectData.last_updated
            ? new Date(projectData.last_updated).toLocaleDateString()
            : "Not available"}
        </Text>
      </Page>

      {/* Executive Summary Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.reportHeader}>Executive Summary</Text>

        <Text style={styles.reportText}>
          This report presents a comprehensive sustainability assessment for {projectData.project_name}
          located in {projectData.location.city}, {projectData.location.country}. The assessment
          employs a multi-criteria evaluation framework based on established sustainability science
          and international standards. The project has achieved an overall sustainability score of
          {' '}{projectData.sustainability_score.overall_score.toFixed(1)} out of 10.0.
        </Text>

        <View style={styles.reportHighlight}>
          <Text style={styles.reportTextBold}>Key Findings:</Text>
          <Text style={styles.reportBullet}>• {getSDGAlignmentText(projectData.sustainability_score.overall_score)}</Text>
          <Text style={styles.reportBullet}>• Overall Risk Assessment: {getRiskLevelText(10 - projectData.sustainability_score.overall_score)}</Text>
          <Text style={styles.reportBullet}>• Feasibility Status: {projectData.feasibility_report.status}</Text>
        </View>

        <Text style={styles.reportSubheader}>Assessment Methodology</Text>
        <Text style={styles.reportText}>
          The sustainability assessment framework applied in this report integrates multiple methodologies
          from scientific literature and global sustainability frameworks. Our approach combines quantitative
          scoring models with qualitative expert analysis across five critical domains:
        </Text>

        <View style={styles.reportTable}>
          <View style={styles.reportTableHeader}>
            <Text style={[styles.reportTableHeaderCell, { flex: 2 }]}>Assessment Domain</Text>
            <Text style={styles.reportTableHeaderCell}>Score</Text>
            <Text style={styles.reportTableHeaderCell}>Weight</Text>
            <Text style={styles.reportTableHeaderCell}>Contribution</Text>
          </View>

          {Object.entries(projectData.sustainability_score.scores).map(([category, data]) => {
            const weight = projectData.sustainability_score.weights[category as keyof typeof projectData.sustainability_score.weights].weight;

            return (
              <View key={category} style={styles.reportTableRow}>
                <Text style={[styles.reportTableCell, { flex: 2 }]}>{category}</Text>
                <Text style={styles.reportTableCell}>{data.raw_score.toFixed(1)}/10.0</Text>
                <Text style={styles.reportTableCell}>{weight.toFixed(2)}</Text>
                <Text style={styles.reportTableCell}>{data.weighted_score.toFixed(1)}</Text>
              </View>
            );
          })}

          <View style={[styles.reportTableRow, { backgroundColor: '#f0fdf4' }]}>
            <Text style={[styles.reportTableCell, { flex: 2, fontWeight: 'bold' }]}>Overall Sustainability Score</Text>
            <Text style={styles.reportTableCell}>-</Text>
            <Text style={styles.reportTableCell}>-</Text>
            <Text style={[styles.reportTableCell, { fontWeight: 'bold' }]}>{projectData.sustainability_score.overall_score.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.reportNote}>
          Note: This assessment follows the composite scoring model approach described in sustainability
          literature, where indicators are normalized, weighted, and aggregated to produce a final score
          (Singh et al., 2009). Weights reflect the relative importance of each domain based on project context.
        </Text>

        <Text style={styles.reportCitation}>
          References: UN SDG Index (dashboards.sdgindex.org), Environmental Performance Index (earthdata.nasa.gov)
        </Text>

        <Text style={styles.reportPageNumber}>1</Text>
      </Page>

      {/* Detailed Assessment Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.reportHeader}>Detailed Sustainability Assessment</Text>

        <Text style={styles.reportSubheader}>1. Sustainability Framework Alignment</Text>
        <Text style={styles.reportText}>
          This assessment evaluates {projectData.project_name} against established global sustainability
          frameworks, including the United Nations&apos; 17 Sustainable Development Goals (SDGs), IPCC Climate
          Risk Assessment methodologies, and industry-specific standards. The multi-dimensional analysis
          considers environmental, social, and economic factors in accordance with the &quot;triple bottom line&quot;
          approach widely endorsed in sustainability science.
        </Text>

        <Text style={styles.reportSubheader}>2. Domain-Specific Analysis</Text>

        {Object.entries(projectData.sustainability_score.scores).map(([category, data], index) => {
          const weight = projectData.sustainability_score.weights[category as keyof typeof projectData.sustainability_score.weights].weight;
          const justification = projectData.sustainability_score.weights[category as keyof typeof projectData.sustainability_score.weights].justification;

          return (
            <View key={category} style={{ marginBottom: 15 }}>
              <Text style={styles.reportTextBold}>
                2.{index + 1}. {category} (Score: {data.raw_score.toFixed(1)}/10.0)
              </Text>

              <Text style={styles.reportText}>
                <Text style={{ fontWeight: 'bold' }}>Assessment Basis: </Text>
                {justification}
              </Text>

              <Text style={styles.reportText}>
                <Text style={{ fontWeight: 'bold' }}>Weight Factor: </Text>
                {weight.toFixed(2)} - This domain represents {(weight * 100).toFixed(0)}% of the overall
                sustainability score, reflecting its relative importance in the project context.
              </Text>

              {data.metrics && Object.entries(data.metrics).length > 0 && (
                <View style={{ marginLeft: 15, marginTop: 5, marginBottom: 8 }}>
                  <Text style={styles.reportTextItalic}>Key Metrics:</Text>
                  {Object.entries(data.metrics).map(([metricName, metricValue]) => (
                    <Text key={metricName} style={styles.reportBullet}>
                      • {metricName}: {typeof metricValue === 'number' ? metricValue.toFixed(1) : metricValue}
                    </Text>
                  ))}
                </View>
              )}

              <Text style={styles.reportText}>
                <Text style={{ fontWeight: 'bold' }}>Analysis: </Text>
                {data.raw_score >= 8
                  ? `The project demonstrates excellent performance in ${category.toLowerCase()}, significantly exceeding benchmark standards.`
                  : data.raw_score >= 6
                    ? `The project shows good performance in ${category.toLowerCase()}, meeting or slightly exceeding benchmark standards.`
                    : data.raw_score >= 4
                      ? `The project shows moderate performance in ${category.toLowerCase()}, meeting minimum benchmark standards.`
                      : `The project shows below-average performance in ${category.toLowerCase()}, falling short of benchmark standards.`
                }
                {data.raw_score < 5
                  ? ` Improvement opportunities exist in this domain to enhance overall sustainability.`
                  : ``
                }
              </Text>

              {index < Object.entries(projectData.sustainability_score.scores).length - 1 && (
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e2e8f0', marginVertical: 8 }} />
              )}
            </View>
          );
        })}

        <Text style={styles.reportPageNumber}>2</Text>
      </Page>

      {/* Risk Analysis Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.reportHeader}>Risk Analysis & Feasibility Assessment</Text>

        <Text style={styles.reportSubheader}>3. Risk Analysis Framework</Text>
        <Text style={styles.reportText}>
          This section applies the IPCC risk framework where climate-related risk emerges from the
          interaction of hazards (e.g., extreme weather), exposure (people and assets in harm&apos;s way),
          and vulnerability (susceptibility to damage). The analysis employs the formula
          Risk = Hazard × (Exposure × Vulnerability) to quantify potential risks to the project.
        </Text>

        <Text style={styles.reportTextBold}>3.1. Risk Assessment Results</Text>

        <View style={styles.reportTable}>
          <View style={styles.reportTableHeader}>
            <Text style={[styles.reportTableHeaderCell, { flex: 2 }]}>Risk Category</Text>
            <Text style={styles.reportTableHeaderCell}>Risk Level</Text>
            <Text style={[styles.reportTableHeaderCell, { flex: 3 }]}>Analysis</Text>
          </View>

          {Object.entries(projectData.risk_analysis).map(([risk, riskData], index) => (
            <View key={index} style={styles.reportTableRow}>
              <Text style={[styles.reportTableCell, { flex: 2 }]}>
                {risk
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Text>
              <Text style={styles.reportTableCell}>{riskData.value}</Text>
              <Text style={[styles.reportTableCell, { flex: 3 }]}>{riskData.explanation}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.reportNote}>
          Note: Risk levels are determined using quantitative criteria based on probability and consequence
          matrices in accordance with ISO 31000 Risk Management standards.
        </Text>

        <Text style={styles.reportSubheader}>4. Feasibility Assessment</Text>
        <Text style={styles.reportText}>
          The feasibility assessment extends traditional project evaluation models to include environmental
          and social criteria alongside economic considerations. This &quot;triple bottom line&quot; approach ensures
          the project is financially sound, technically achievable, and delivers environmental and social benefits.
        </Text>

        <View style={projectData.feasibility_report.status.toLowerCase().includes("approved") ||
          projectData.feasibility_report.status.toLowerCase().includes("feasible") ?
          styles.reportHighlight : styles.reportWarning}>
          <Text style={styles.reportTextBold}>Feasibility Status: {projectData.feasibility_report.status}</Text>

          <Text style={styles.reportTextBold}>Key Findings:</Text>
          {projectData.feasibility_report.key_findings.map((finding, index) => (
            <Text key={index} style={styles.reportBullet}>• {finding}</Text>
          ))}

          <Text style={styles.reportTextBold}>Recommendations:</Text>
          {projectData.feasibility_report.recommendations.map((rec, index) => (
            <Text key={index} style={styles.reportBullet}>• {rec}</Text>
          ))}
        </View>

        <Text style={styles.reportCitation}>
          References: IPCC Climate Reports (ipcc.ch), Risk Assessment Models (egusphere.copernicus.org)
        </Text>

        <Text style={styles.reportPageNumber}>3</Text>
      </Page>

      {/* Policy Compliance Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.reportHeader}>Policy Compliance & Funding Opportunities</Text>

        <Text style={styles.reportSubheader}>5. Regulatory Compliance Analysis</Text>
        <Text style={styles.reportText}>
          This section evaluates the project&apos;s alignment with relevant local regulations and international
          guidelines. Compliance with these frameworks is essential for project approval, risk mitigation,
          and access to sustainable financing opportunities.
        </Text>

        <Text style={styles.reportTextBold}>5.1. Local Regulatory Compliance</Text>

        <View style={styles.reportTable}>
          <View style={styles.reportTableHeader}>
            <Text style={[styles.reportTableHeaderCell, { flex: 2 }]}>Regulation</Text>
            <Text style={styles.reportTableHeaderCell}>Status</Text>
            <Text style={[styles.reportTableHeaderCell, { flex: 2 }]}>Notes</Text>
          </View>

          {projectData.policy_compliance.local_regulations.map((reg, index) => (
            <View key={index} style={styles.reportTableRow}>
              <Text style={[styles.reportTableCell, { flex: 2 }]}>{reg.law_name}</Text>
              <Text style={styles.reportTableCell}>{reg.compliance_status}</Text>
              <Text style={[styles.reportTableCell, { flex: 2 }]}>{reg.notes}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.reportTextBold}>5.2. International Guidelines Alignment</Text>

        <View style={styles.reportTable}>
          <View style={styles.reportTableHeader}>
            <Text style={[styles.reportTableHeaderCell, { flex: 2 }]}>Framework/Treaty</Text>
            <Text style={styles.reportTableHeaderCell}>Alignment</Text>
            <Text style={[styles.reportTableHeaderCell, { flex: 2 }]}>Notes</Text>
          </View>

          {projectData.policy_compliance.international_guidelines.map((guide, index) => (
            <View key={index} style={styles.reportTableRow}>
              <Text style={[styles.reportTableCell, { flex: 2 }]}>{guide.treaty}</Text>
              <Text style={styles.reportTableCell}>{guide.alignment}</Text>
              <Text style={[styles.reportTableCell, { flex: 2 }]}>{guide.notes}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.reportSubheader}>6. Funding Opportunities</Text>
        <Text style={styles.reportText}>
          Based on the sustainability assessment and compliance analysis, the following funding
          opportunities have been identified as potentially suitable for this project:
        </Text>

        <View style={styles.reportTable}>
          <View style={styles.reportTableHeader}>
            <Text style={[styles.reportTableHeaderCell, { flex: 2 }]}>Funding Source</Text>
            <Text style={styles.reportTableHeaderCell}>Amount</Text>
            <Text style={styles.reportTableHeaderCell}>Deadline</Text>
            <Text style={styles.reportTableHeaderCell}>Eligibility</Text>
          </View>

          {projectData.funding_opportunities.map((fund, index) => (
            <View key={index} style={styles.reportTableRow}>
              <Text style={[styles.reportTableCell, { flex: 2 }]}>{fund.name}</Text>
              <Text style={styles.reportTableCell}>{fund.amount}</Text>
              <Text style={styles.reportTableCell}>{fund.application_deadline}</Text>
              <Text style={styles.reportTableCell}>{fund.eligibility}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.reportPageNumber}>4</Text>
      </Page>

      {/* Data Sources & Methodology Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.reportHeader}>Data Sources & Methodology</Text>

        <Text style={styles.reportSubheader}>7. Data Integration Approach</Text>
        <Text style={styles.reportText}>
          This assessment integrates data from multiple sources, including environmental APIs,
          geospatial databases, and regulatory information systems. The data integration follows
          best practices for structuring API data to ensure accuracy and reliability in the
          sustainability calculations.
        </Text>

        <Text style={styles.reportTextBold}>7.1. API Data Sources</Text>

        <View style={styles.reportTable}>
          <View style={styles.reportTableHeader}>
            <Text style={[styles.reportTableHeaderCell, { flex: 1 }]}>API Source</Text>
            <Text style={[styles.reportTableHeaderCell, { flex: 2 }]}>Description</Text>
            <Text style={[styles.reportTableHeaderCell, { flex: 1 }]}>Data Provider</Text>
          </View>

          {projectData.api_context_data.api.map((api, index) => (
            <View key={index} style={styles.reportTableRow}>
              <Text style={[styles.reportTableCell, { flex: 1 }]}>{api.name}</Text>
              <Text style={[styles.reportTableCell, { flex: 2 }]}>{api.summary}</Text>
              <Text style={[styles.reportTableCell, { flex: 1 }]}>{api.source}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.reportSubheader}>8. Assessment Methodology</Text>
        <Text style={styles.reportText}>
          The sustainability assessment methodology employed in this report follows a multi-criteria
          decision analysis (MCDA) approach, which is widely recognized in sustainability science
          literature. The process involves:
        </Text>

        <Text style={styles.reportBullet}>
          • <Text style={{ fontWeight: 'bold' }}>Indicator Selection:</Text> Key performance indicators
          were selected across five sustainability domains based on their relevance, measurability,
          and alignment with global frameworks.
        </Text>

        <Text style={styles.reportBullet}>
          • <Text style={{ fontWeight: 'bold' }}>Data Normalization:</Text> Raw data from various sources
          were normalized to comparable scales (0-10) using proximity-to-target methods.
        </Text>

        <Text style={styles.reportBullet}>
          • <Text style={{ fontWeight: 'bold' }}>Weighting:</Text> Domain weights were assigned based on
          project context, regional priorities, and expert assessment of relative importance.
        </Text>

        <Text style={styles.reportBullet}>
          • <Text style={{ fontWeight: 'bold' }}>Aggregation:</Text> A weighted average model was used to
          calculate the overall sustainability score, following established practices in indices like
          the SDG Index and Environmental Performance Index.
        </Text>

        <Text style={styles.reportBullet}>
          • <Text style={{ fontWeight: 'bold' }}>Risk Assessment:</Text> The IPCC risk framework
          (Risk = Hazard × Exposure × Vulnerability) was applied to evaluate potential threats.
        </Text>

        <View style={styles.reportHighlight}>
          <Text style={styles.reportTextBold}>Certification Statement:</Text>
          <Text style={styles.reportText}>
            This sustainability assessment has been conducted in accordance with international
            environmental standards and methodologies established in peer-reviewed literature.
            The assessment framework integrates approaches from the United Nations Sustainable
            Development Goals, IPCC Climate Risk Assessment, and ISO 14001 Environmental Management
            Systems to provide a comprehensive evaluation of the project&apos;s sustainability profile.
          </Text>
        </View>

        <Text style={styles.reportCitation}>
          References: Singh et al. (2009), UN SDG Index (dashboards.sdgindex.org), Environmental Performance Index (earthdata.nasa.gov),
          IPCC Risk Framework (ipcc.ch), Multi-criteria Decision Analysis for Sustainability (mdpi.com)
        </Text>

        <Text style={styles.footer}>End of Report</Text>
        <Text style={styles.reportPageNumber}>5</Text>
      </Page>
    </Document>
  );
}
