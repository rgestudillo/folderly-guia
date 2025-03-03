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
    marginBottom: 20, // Increase spacing below
    textAlign: "center",
    lineHeight: 1.2, // Improves spacing if you have multi-line text
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
});

interface ProjectReportPDFProps {
  projectData: ProjectData;
}

export function ProjectReportPDF({ projectData }: ProjectReportPDFProps) {
  return (
    <Document>
      {/* Title Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{projectData.project_name}</Text>
          <Text style={styles.subtitle}>Sustainability Report</Text>
        </View>
        <View>
          <Text style={styles.infoText}>
            Location: {projectData.location.city},{" "}
            {projectData.location.country}
          </Text>
          <Text style={styles.infoText}>
            Coordinates: {projectData.location.latitude},{" "}
            {projectData.location.longitude}
          </Text>
          <Text style={styles.infoText}>
            Sustainability Score: {projectData.sustainability_score.score} (
            {projectData.sustainability_score.rating})
          </Text>
        </View>
        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString()} | Last Updated:{" "}
          {projectData.last_updated
            ? new Date(projectData.last_updated).toLocaleDateString()
            : "Not available"}
        </Text>
      </Page>

      {/* Content Page */}
      <Page size="A4" style={styles.page}>
        {/* Feasibility Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feasibility Assessment</Text>
          <Text style={styles.badge}>
            Status: {projectData.feasibility_report.status}
          </Text>
          <Text style={styles.subsectionTitle}>Key Findings</Text>
          {projectData.feasibility_report.key_findings.map((finding, index) => (
            <Text key={index} style={styles.listItem}>
              • {finding}
            </Text>
          ))}
          <Text style={styles.subsectionTitle}>Recommendations</Text>
          {projectData.feasibility_report.recommendations.map((rec, index) => (
            <Text key={index} style={styles.listItem}>
              • {rec}
            </Text>
          ))}
        </View>

        {/* Risk Analysis Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Analysis</Text>
          {Object.entries(projectData.risk_analysis).map(
            ([risk, riskData], index) => (
              <Text key={index} style={styles.listItem}>
                •{" "}
                {risk
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                : {riskData.value}
                {riskData.explanation && `\n  ${riskData.explanation}`}
              </Text>
            )
          )}
        </View>

        {/* Policy Compliance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Policy Compliance</Text>
          <Text style={styles.subsectionTitle}>Local Regulations</Text>
          {projectData.policy_compliance.local_regulations.map((reg, index) => (
            <Text key={index} style={styles.listItem}>
              • <Text style={{ fontWeight: "bold" }}>{reg.law_name}:</Text>{" "}
              {reg.compliance_status}
              {reg.notes && `\n  Notes: ${reg.notes}`}
            </Text>
          ))}
          <Text style={styles.subsectionTitle}>International Guidelines</Text>
          {projectData.policy_compliance.international_guidelines.map(
            (guide, index) => (
              <Text key={index} style={styles.listItem}>
                • <Text style={{ fontWeight: "bold" }}>{guide.treaty}:</Text>{" "}
                {guide.alignment}
                {guide.notes && `\n  Notes: ${guide.notes}`}
              </Text>
            )
          )}
        </View>

        {/* Funding Opportunities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funding Opportunities</Text>
          {projectData.funding_opportunities.map((fund, index) => (
            <Text key={index} style={styles.listItem}>
              • <Text style={{ fontWeight: "bold" }}>{fund.name}</Text>
              {"\n  Amount: "}
              {fund.amount}
              {"\n  Deadline: "}
              {fund.application_deadline}
            </Text>
          ))}
        </View>

        <Text style={styles.footer}>End of Report</Text>
      </Page>
    </Document>
  );
}
