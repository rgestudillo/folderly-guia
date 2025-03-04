export const sustainabilitySchema = {
  "name": "project_data",
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
        "required": [
          "api"
        ],
        "properties": {
          "api": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "name",
                "summary",
                "source"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "description": "The name of the API context entry."
                },
                "source": {
                  "type": "string",
                  "description": "The source of the API context data."
                },
                "summary": {
                  "type": "string",
                  "description": "A brief summary of the API context data. I want it to use the actual data from the API."
                }
              },
              "additionalProperties": false
            },
            "description": "Array of API context entries, each with a name, summary, and source."
          }
        },
        "description": "Container for API context data summary.",
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
            },
            "description": "Key findings from the feasibility report. I want it to be completely related to the project and the sustainability score."
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
          "weights",
          "scores",
          "overall_score"
        ],
        "properties": {
          "scores": {
            "type": "object",
            "required": [
              "Climate & Weather Data",
              "Air Quality & Pollution",
              "Disaster Risk & Hazard Data",
              "Biodiversity & Ecosystem Health",
              "Renewable Energy & Infrastructure Feasibility"
            ],
            "properties": {
              "Climate & Weather Data": {
                "type": "object",
                "required": [
                  "raw_score",
                  "weighted_score"
                ],
                "properties": {
                  "metrics": {
                    "type": "object",
                    "description": "Detailed breakdown of key metrics and their contributions.",
                    "additionalProperties": {
                      "type": "number"
                    }
                  },
                  "raw_score": {
                    "type": "number"
                  },
                  "weighted_score": {
                    "type": "number"
                  }
                },
                "additionalProperties": false
              },
              "Air Quality & Pollution": {
                "type": "object",
                "required": [
                  "raw_score",
                  "weighted_score"
                ],
                "properties": {
                  "metrics": {
                    "type": "object",
                    "description": "Detailed breakdown of key metrics and their contributions.",
                    "additionalProperties": {
                      "type": "number"
                    }
                  },
                  "raw_score": {
                    "type": "number"
                  },
                  "weighted_score": {
                    "type": "number"
                  }
                },
                "additionalProperties": false
              },
              "Disaster Risk & Hazard Data": {
                "type": "object",
                "required": [
                  "raw_score",
                  "weighted_score"
                ],
                "properties": {
                  "metrics": {
                    "type": "object",
                    "description": "Detailed breakdown of key metrics and their contributions.",
                    "additionalProperties": {
                      "type": "number"
                    }
                  },
                  "raw_score": {
                    "type": "number"
                  },
                  "weighted_score": {
                    "type": "number"
                  }
                },
                "additionalProperties": false
              },
              "Biodiversity & Ecosystem Health": {
                "type": "object",
                "required": [
                  "raw_score",
                  "weighted_score"
                ],
                "properties": {
                  "metrics": {
                    "type": "object",
                    "description": "Detailed breakdown of key metrics and their contributions.",
                    "additionalProperties": {
                      "type": "number"
                    }
                  },
                  "raw_score": {
                    "type": "number"
                  },
                  "weighted_score": {
                    "type": "number"
                  }
                },
                "additionalProperties": false
              },
              "Renewable Energy & Infrastructure Feasibility": {
                "type": "object",
                "required": [
                  "raw_score",
                  "weighted_score"
                ],
                "properties": {
                  "metrics": {
                    "type": "object",
                    "description": "Detailed breakdown of key metrics and their contributions.",
                    "additionalProperties": {
                      "type": "number"
                    }
                  },
                  "raw_score": {
                    "type": "number"
                  },
                  "weighted_score": {
                    "type": "number"
                  }
                },
                "additionalProperties": false
              }
            },
            "description": "Raw and weighted scores for each sustainability aspect with detailed metrics breakdown.",
            "additionalProperties": false
          },
          "weights": {
            "type": "object",
            "required": [
              "Climate & Weather Data",
              "Air Quality & Pollution",
              "Disaster Risk & Hazard Data",
              "Biodiversity & Ecosystem Health",
              "Renewable Energy & Infrastructure Feasibility"
            ],
            "properties": {
              "Climate & Weather Data": {
                "type": "object",
                "required": [
                  "weight",
                  "justification"
                ],
                "properties": {
                  "weight": {
                    "type": "number"
                  },
                  "justification": {
                    "type": "string"
                  }
                },
                "additionalProperties": false
              },
              "Air Quality & Pollution": {
                "type": "object",
                "required": [
                  "weight",
                  "justification"
                ],
                "properties": {
                  "weight": {
                    "type": "number"
                  },
                  "justification": {
                    "type": "string"
                  }
                },
                "additionalProperties": false
              },
              "Disaster Risk & Hazard Data": {
                "type": "object",
                "required": [
                  "weight",
                  "justification"
                ],
                "properties": {
                  "weight": {
                    "type": "number"
                  },
                  "justification": {
                    "type": "string"
                  }
                },
                "additionalProperties": false
              },
              "Biodiversity & Ecosystem Health": {
                "type": "object",
                "required": [
                  "weight",
                  "justification"
                ],
                "properties": {
                  "weight": {
                    "type": "number"
                  },
                  "justification": {
                    "type": "string"
                  }
                },
                "additionalProperties": false
              },
              "Renewable Energy & Infrastructure Feasibility": {
                "type": "object",
                "required": [
                  "weight",
                  "justification"
                ],
                "properties": {
                  "weight": {
                    "type": "number"
                  },
                  "justification": {
                    "type": "string"
                  }
                },
                "additionalProperties": false
              }
            },
            "description": "Normalized weights for each sustainability aspect with justifications.",
            "additionalProperties": false
          },
          "overall_score": {
            "type": "number",
            "description": "The overall sustainability score, calculated as the sum of all weighted contributions."
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