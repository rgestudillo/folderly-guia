export const sustainabilitySchema = {
  "name": "project_data",
  "strict": true,
  "schema": {
    "type": "object",
    "required": [
      "project_name",
      "sustainability_score",
      "feasibility_report",
      "risk_analysis",
      "policy_compliance",
      "funding_opportunities",
      "api_context_data"
    ],
    "properties": {
      "project_name": {
        "type": "string"
      },
      "risk_analysis": {
        "type": "object",
        "required": [
          "flood_risk",
          "earthquake_risk",
          "pollution_level",
          "biodiversity_threats",
          "climate_risk",
          "infrastructure_risk"
        ],
        "properties": {
          "flood_risk": {
            "type": "object",
            "required": [
              "value",
              "explanation"
            ],
            "properties": {
              "value": {
                "enum": [
                  "low",
                  "medium",
                  "high"
                ],
                "type": "string"
              },
              "explanation": {
                "type": "string"
              }
            },
            "additionalProperties": false
          },
          "climate_risk": {
            "type": "object",
            "required": [
              "value",
              "explanation"
            ],
            "properties": {
              "value": {
                "enum": [
                  "low",
                  "medium",
                  "high"
                ],
                "type": "string"
              },
              "explanation": {
                "type": "string"
              }
            },
            "additionalProperties": false
          },
          "earthquake_risk": {
            "type": "object",
            "required": [
              "value",
              "explanation"
            ],
            "properties": {
              "value": {
                "enum": [
                  "low",
                  "medium",
                  "high"
                ],
                "type": "string"
              },
              "explanation": {
                "type": "string"
              }
            },
            "additionalProperties": false
          },
          "pollution_level": {
            "type": "object",
            "required": [
              "value",
              "explanation"
            ],
            "properties": {
              "value": {
                "enum": [
                  "low",
                  "medium",
                  "high"
                ],
                "type": "string"
              },
              "explanation": {
                "type": "string"
              }
            },
            "additionalProperties": false
          },
          "infrastructure_risk": {
            "type": "object",
            "required": [
              "value",
              "explanation"
            ],
            "properties": {
              "value": {
                "enum": [
                  "low",
                  "medium",
                  "high"
                ],
                "type": "string"
              },
              "explanation": {
                "type": "string"
              }
            },
            "additionalProperties": false
          },
          "biodiversity_threats": {
            "type": "object",
            "required": [
              "value",
              "explanation"
            ],
            "properties": {
              "value": {
                "enum": [
                  "low",
                  "medium",
                  "high"
                ],
                "type": "string"
              },
              "explanation": {
                "type": "string"
              }
            },
            "additionalProperties": false
          }
        },
        "additionalProperties": false
      },
      "api_context_data": {
        "type": "object",
        "description": "Container for API context data summary.",
        "properties": {
          "api": {
            "type": "array",
            "description": "Array of API context entries, each with a name, summary, and source.",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "The name of the API context entry."
                },
                "summary": {
                  "type": "string",
                  "description": "A brief summary of the API context data."
                },
                "source": {
                  "type": "string",
                  "description": "The source of the API context data."
                }
              },
              "required": [
                "name",
                "summary",
                "source"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "api"
        ],
        "additionalProperties": false
      },
      "policy_compliance": {
        "type": "object",
        "required": [
          "local_regulations",
          "international_guidelines"
        ],
        "properties": {
          "local_regulations": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "law_name",
                "compliance_status",
                "notes"
              ],
              "properties": {
                "notes": {
                  "type": "string"
                },
                "law_name": {
                  "type": "string"
                },
                "compliance_status": {
                  "type": "string"
                }
              },
              "additionalProperties": false
            }
          },
          "international_guidelines": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "treaty",
                "alignment",
                "notes"
              ],
              "properties": {
                "notes": {
                  "type": "string"
                },
                "treaty": {
                  "type": "string"
                },
                "alignment": {
                  "type": "string"
                }
              },
              "additionalProperties": false
            }
          }
        },
        "additionalProperties": false
      },
      "feasibility_report": {
        "type": "object",
        "required": [
          "status",
          "key_findings",
          "recommendations"
        ],
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
        "additionalProperties": false
      },
      "sustainability_score": {
        "type": "object",
        "required": [
          "score",
          "rating",
          "explanation",
          "factors"
        ],
        "properties": {
          "score": {
            "type": "number"
          },
          "rating": {
            "type": "string"
          },
          "factors": {
            "type": "object",
            "required": [],
            "properties": {},
            "additionalProperties": {
              "type": "object",
              "required": [
                "value",
                "explanation"
              ],
              "properties": {
                "value": {
                  "type": "number"
                },
                "explanation": {
                  "type": "string"
                }
              },
              "additionalProperties": false
            }
          },
          "explanation": {
            "type": "string"
          }
        },
        "additionalProperties": false
      },
      "funding_opportunities": {
        "type": "array",
        "items": {
          "type": "object",
          "required": [
            "name",
            "amount",
            "eligibility",
            "application_deadline",
            "link"
          ],
          "properties": {
            "link": {
              "type": "string"
            },
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
            }
          },
          "additionalProperties": false
        }
      }
    },
    "additionalProperties": false
  }
}