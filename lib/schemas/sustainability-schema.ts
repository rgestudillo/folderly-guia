export const sustainabilitySchema = {
  "name": "project_data",
  "strict": true,
  "schema": {
    "type": "object",
    "properties": {
      "project_name": {
        "type": "string"
      },
      "location": {
        "type": "object",
        "properties": {
          "latitude": {
            "type": "number"
          },
          "longitude": {
            "type": "number"
          },
          "city": {
            "type": "string"
          },
          "country": {
            "type": "string"
          },
          "images": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "latitude",
          "longitude",
          "city",
          "country",
          "images"
        ],
        "additionalProperties": false
      },
      "sustainability_score": {
        "type": "object",
        "properties": {
          "score": {
            "type": "number"
          },
          "rating": {
            "type": "string"
          },
          "explanation": {
            "type": "string"
          },
          "factors": {
            "type": "object",
            "properties": {},
            "required": [],
            "additionalProperties": {
              "type": "object",
              "properties": {
                "value": {
                  "type": "number"
                },
                "explanation": {
                  "type": "string"
                }
              },
              "required": [
                "value",
                "explanation"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "score",
          "rating",
          "explanation",
          "factors"
        ],
        "additionalProperties": false
      },
      "feasibility_report": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string"
          },
          "key_findings": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "recommendations": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "status",
          "key_findings",
          "recommendations"
        ],
        "additionalProperties": false
      },
      "risk_analysis": {
        "type": "object",
        "properties": {},
        "required": [],
        "additionalProperties": {
          "type": "object",
          "properties": {
            "value": {
              "type": "string"
            },
            "explanation": {
              "type": "string"
            }
          },
          "required": [
            "value",
            "explanation"
          ],
          "additionalProperties": false
        }
      },
      "policy_compliance": {
        "type": "object",
        "properties": {
          "local_regulations": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "law_name": {
                  "type": "string"
                },
                "compliance_status": {
                  "type": "string"
                },
                "notes": {
                  "type": "string"
                }
              },
              "required": [
                "law_name",
                "compliance_status",
                "notes"
              ],
              "additionalProperties": false
            }
          },
          "international_guidelines": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "treaty": {
                  "type": "string"
                },
                "alignment": {
                  "type": "string"
                },
                "notes": {
                  "type": "string"
                }
              },
              "required": [
                "treaty",
                "alignment",
                "notes"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "local_regulations",
          "international_guidelines"
        ],
        "additionalProperties": false
      },
      "funding_opportunities": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "amount": {
              "type": "string"
            },
            "eligibility": {
              "type": "string"
            },
            "application_deadline": {
              "type": "string"
            },
            "link": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "amount",
            "eligibility",
            "application_deadline",
            "link"
          ],
          "additionalProperties": false
        }
      },
      "gis_visualization": {
        "type": "object",
        "properties": {
          "layers": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "source": {
                  "type": "string"
                }
              },
              "required": [
                "name",
                "description",
                "source"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "layers"
        ],
        "additionalProperties": false
      }
    },
    "required": [
      "project_name",
      "location",
      "sustainability_score",
      "feasibility_report",
      "risk_analysis",
      "policy_compliance",
      "funding_opportunities",
      "gis_visualization"
    ],
    "additionalProperties": false
  }
}; 