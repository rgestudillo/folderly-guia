import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ProjectData } from '@/types/project';
import { sustainabilitySystemPrompt } from '@/lib/openai/sustainability-prompt';
import { getLocationImages } from '@/lib/location-images';

// Initialize Gemini API client
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: Request) {
  try {
    const { location, project_idea, radius, raw_data } = await request.json();
    const { latitude, longitude, location_name } = location;

    const city = location_name.split(",")[0]?.trim() || "Unknown City";
    const country = location_name.split(",").slice(-1)[0]?.trim() || "Unknown Country";
    const locationImages = await getLocationImages(latitude, longitude);

    const apiContext = `aggregatedData ${JSON.stringify(raw_data, null, 2)}`;

    console.log("GEMINI PROMPT: ",
      `LOCATION:  \n${location_name}
      \n\nPROJECT: \n${project_idea}
      \n\nPROJECT RADIUS: \n${radius} meters\n\n
      API CONTEXT: \n${apiContext}\n`
    )

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: sustainabilitySystemPrompt
    });

    const generationConfig = {
      temperature: 0,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        description: "Schema for sustainability project data.",
        properties: {
          project_name: {
            type: "string",
            description: "The name of the project."
          },
          risk_analysis: {
            type: "object",
            description: "Analysis of potential risks.",
            properties: {
              flood_risk: {
                type: "object",
                description: "Assessment of flood risk.",
                properties: {
                  value: {
                    type: "string",
                    description: "Level of flood risk (low, medium, high).",
                    enum: [
                      "low",
                      "medium",
                      "high"
                    ]
                  },
                  explanation: {
                    type: "string",
                    description: "Explanation of the flood risk."
                  }
                },
                required: [
                  "value",
                  "explanation"
                ]
              },
              climate_risk: {
                type: "object",
                description: "Assessment of climate risk.",
                properties: {
                  value: {
                    type: "string",
                    description: "Level of climate risk (low, medium, high).",
                    enum: [
                      "low",
                      "medium",
                      "high"
                    ]
                  },
                  explanation: {
                    type: "string",
                    description: "Explanation of the climate risk."
                  }
                },
                required: [
                  "value",
                  "explanation"
                ]
              },
              earthquake_risk: {
                type: "object",
                description: "Assessment of earthquake risk.",
                properties: {
                  value: {
                    type: "string",
                    description: "Level of earthquake risk (low, medium, high).",
                    enum: [
                      "low",
                      "medium",
                      "high"
                    ]
                  },
                  explanation: {
                    type: "string",
                    description: "Explanation of the earthquake risk."
                  }
                },
                required: [
                  "value",
                  "explanation"
                ]
              },
              pollution_level: {
                type: "object",
                description: "Assessment of pollution level.",
                properties: {
                  value: {
                    type: "string",
                    description: "Level of pollution (low, medium, high).",
                    enum: [
                      "low",
                      "medium",
                      "high"
                    ]
                  },
                  explanation: {
                    type: "string",
                    description: "Explanation of the pollution level."
                  }
                },
                required: [
                  "value",
                  "explanation"
                ]
              },
              infrastructure_risk: {
                type: "object",
                description: "Assessment of infrastructure risk.",
                properties: {
                  value: {
                    type: "string",
                    description: "Level of infrastructure risk (low, medium, high).",
                    enum: [
                      "low",
                      "medium",
                      "high"
                    ]
                  },
                  explanation: {
                    type: "string",
                    description: "Explanation of the infrastructure risk."
                  }
                },
                required: [
                  "value",
                  "explanation"
                ]
              },
              biodiversity_threats: {
                type: "object",
                description: "Assessment of threats to biodiversity.",
                properties: {
                  value: {
                    type: "string",
                    description: "Level of biodiversity threats (low, medium, high).",
                    enum: [
                      "low",
                      "medium",
                      "high"
                    ]
                  },
                  explanation: {
                    type: "string",
                    description: "Explanation of the biodiversity threats."
                  }
                },
                required: [
                  "value",
                  "explanation"
                ]
              }
            },
            required: [
              "flood_risk",
              "earthquake_risk",
              "pollution_level",
              "biodiversity_threats",
              "climate_risk",
              "infrastructure_risk"
            ]
          },
          api_context_data: {
            type: "object",
            description: "Contextual data from APIs.",
            properties: {
              api: {
                type: "array",
                description: "Array of API context entries.",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "The name of the API context entry."
                    },
                    source: {
                      type: "string",
                      description: "The source of the API context data."
                    },
                    summary: {
                      type: "string",
                      description: "A brief summary of the API data."
                    }
                  },
                  required: [
                    "name",
                    "summary",
                    "source"
                  ]
                }
              }
            },
            required: [
              "api"
            ]
          },
          policy_compliance: {
            type: "object",
            description: "Assessment of policy compliance.",
            properties: {
              local_regulations: {
                type: "array",
                description: "Compliance with local regulations.",
                items: {
                  type: "object",
                  properties: {
                    law_name: {
                      type: "string",
                      description: "The name of the local regulation."
                    },
                    compliance_status: {
                      type: "string",
                      description: "Compliance status with the regulation."
                    },
                    notes: {
                      type: "string",
                      description: "Notes regarding compliance."
                    }
                  },
                  required: [
                    "law_name",
                    "compliance_status",
                    "notes"
                  ]
                }
              },
              international_guidelines: {
                type: "array",
                description: "Alignment with international guidelines.",
                items: {
                  type: "object",
                  properties: {
                    treaty: {
                      type: "string",
                      description: "The name of the international treaty."
                    },
                    alignment: {
                      type: "string",
                      description: "Alignment with the treaty."
                    },
                    notes: {
                      type: "string",
                      description: "Notes regarding alignment."
                    }
                  },
                  required: [
                    "treaty",
                    "alignment",
                    "notes"
                  ]
                }
              }
            },
            required: [
              "local_regulations",
              "international_guidelines"
            ]
          },
          feasibility_report: {
            type: "object",
            description: "Feasibility report details.",
            properties: {
              status: {
                type: "string",
                description: "The status of the feasibility report."
              },
              key_findings: {
                type: "array",
                description: "Key findings from the feasibility report.",
                items: {
                  type: "string"
                }
              },
              recommendations: {
                type: "array",
                description: "Recommendations from the feasibility report.",
                items: {
                  type: "string"
                }
              }
            },
            required: [
              "status",
              "key_findings",
              "recommendations"
            ]
          },
          sustainability_score: {
            type: "object",
            description: "Details of the sustainability score.",
            properties: {
              weights: {
                type: "object",
                description: "Weights for sustainability aspects.",
                properties: {
                  "Climate & Weather Data": {
                    type: "object",
                    description: "Weight and justification for climate data.",
                    properties: {
                      weight: {
                        type: "number",
                        description: "The weight assigned."
                      },
                      justification: {
                        type: "string",
                        description: "Justification for the weight."
                      }
                    },
                    required: [
                      "weight",
                      "justification"
                    ]
                  },
                  "Air Quality & Pollution": {
                    type: "object",
                    description: "Weight and justification for air quality.",
                    properties: {
                      weight: {
                        type: "number",
                        description: "The weight assigned."
                      },
                      justification: {
                        type: "string",
                        description: "Justification for the weight."
                      }
                    },
                    required: [
                      "weight",
                      "justification"
                    ]
                  },
                  "Disaster Risk & Hazard Data": {
                    type: "object",
                    description: "Weight and justification for disaster risk.",
                    properties: {
                      weight: {
                        type: "number",
                        description: "The weight assigned."
                      },
                      justification: {
                        type: "string",
                        description: "Justification for the weight."
                      }
                    },
                    required: [
                      "weight",
                      "justification"
                    ]
                  },
                  "Biodiversity & Ecosystem Health": {
                    type: "object",
                    description: "Weight and justification for biodiversity.",
                    properties: {
                      weight: {
                        type: "number",
                        description: "The weight assigned."
                      },
                      justification: {
                        type: "string",
                        description: "Justification for the weight."
                      }
                    },
                    required: [
                      "weight",
                      "justification"
                    ]
                  },
                  "Renewable Energy & Infrastructure Feasibility": {
                    type: "object",
                    description: "Weight and justification for renewable energy.",
                    properties: {
                      weight: {
                        type: "number",
                        description: "The weight assigned."
                      },
                      justification: {
                        type: "string",
                        description: "Justification for the weight."
                      }
                    },
                    required: [
                      "weight",
                      "justification"
                    ]
                  }
                },
                required: [
                  "Climate & Weather Data",
                  "Air Quality & Pollution",
                  "Disaster Risk & Hazard Data",
                  "Biodiversity & Ecosystem Health",
                  "Renewable Energy & Infrastructure Feasibility"
                ]
              },
              scores: {
                type: "object",
                description: "Raw and weighted scores for each aspect.",
                properties: {
                  "Climate & Weather Data": {
                    type: "object",
                    description: "Scores for climate data.",
                    properties: {
                      raw_score: {
                        type: "number",
                        description: "The raw score."
                      },
                      weighted_score: {
                        type: "number",
                        description: "The weighted score."
                      },
                      metrics: {
                        type: "object",
                        description: "Detailed breakdown of metrics.",
                        properties: {
                          temperature: {
                            type: "number",
                            description: "Temperature in Celsius."
                          },
                          humidity: {
                            type: "number",
                            description: "Humidity percentage."
                          }
                        }
                      }
                    },
                    required: [
                      "raw_score",
                      "weighted_score"
                    ]
                  },
                  "Air Quality & Pollution": {
                    type: "object",
                    description: "Scores for air quality.",
                    properties: {
                      raw_score: {
                        type: "number",
                        description: "The raw score."
                      },
                      weighted_score: {
                        type: "number",
                        description: "The weighted score."
                      },
                      metrics: {
                        type: "object",
                        description: "Detailed breakdown of metrics.",
                        properties: {
                          co2: {
                            type: "number",
                            description: "CO2 level in ppm."
                          },
                          ozone: {
                            type: "number",
                            description: "Ozone level in ppb."
                          }
                        }
                      }
                    },
                    required: [
                      "raw_score",
                      "weighted_score"
                    ]
                  },
                  "Disaster Risk & Hazard Data": {
                    type: "object",
                    description: "Scores for disaster risk.",
                    properties: {
                      raw_score: {
                        type: "number",
                        description: "The raw score."
                      },
                      weighted_score: {
                        type: "number",
                        description: "The weighted score."
                      },
                      metrics: {
                        type: "object",
                        description: "Detailed breakdown of metrics.",
                        properties: {
                          flood_probability: {
                            type: "number",
                            description: "Probability of flooding (0-1)."
                          },
                          earthquake_magnitude: {
                            type: "number",
                            description: "Earthquake magnitude on the Richter scale."
                          }
                        }
                      }
                    },
                    required: [
                      "raw_score",
                      "weighted_score"
                    ]
                  },
                  "Biodiversity & Ecosystem Health": {
                    type: "object",
                    description: "Scores for biodiversity.",
                    properties: {
                      raw_score: {
                        type: "number",
                        description: "The raw score."
                      },
                      weighted_score: {
                        type: "number",
                        description: "The weighted score."
                      },
                      metrics: {
                        type: "object",
                        description: "Detailed breakdown of metrics.",
                        properties: {
                          species_richness: {
                            type: "number",
                            description: "Number of species in the area."
                          },
                          habitat_area: {
                            type: "number",
                            description: "Area of suitable habitat in hectares."
                          }
                        }
                      }
                    },
                    required: [
                      "raw_score",
                      "weighted_score"
                    ]
                  },
                  "Renewable Energy & Infrastructure Feasibility": {
                    type: "object",
                    description: "Scores for renewable energy.",
                    properties: {
                      raw_score: {
                        type: "number",
                        description: "The raw score."
                      },
                      weighted_score: {
                        type: "number",
                        description: "The weighted score."
                      },
                      metrics: {
                        type: "object",
                        description: "Detailed breakdown of metrics.",
                        properties: {
                          solar_irradiance: {
                            type: "number",
                            description: "Average solar irradiance (kW/m^2)."
                          },
                          wind_speed: {
                            type: "number",
                            description: "Average wind speed (m/s)."
                          }
                        }
                      }
                    },
                    required: [
                      "raw_score",
                      "weighted_score"
                    ]
                  }
                },
                required: [
                  "Climate & Weather Data",
                  "Air Quality & Pollution",
                  "Disaster Risk & Hazard Data",
                  "Biodiversity & Ecosystem Health",
                  "Renewable Energy & Infrastructure Feasibility"
                ]
              },
              overall_score: {
                type: "number",
                description: "The overall sustainability score."
              }
            },
            required: [
              "weights",
              "scores",
              "overall_score"
            ]
          },
          funding_opportunities: {
            type: "array",
            description: "Array of funding opportunities.",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "The name of the funding opportunity."
                },
                amount: {
                  type: "string",
                  description: "The amount of funding available."
                },
                eligibility: {
                  type: "string",
                  description: "Eligibility criteria for the funding opportunity."
                },
                application_deadline: {
                  type: "string",
                  description: "The application deadline."
                },
                link: {
                  type: "string",
                  description: "Link to funding opportunity details."
                }
              },
              required: [
                "name",
                "amount",
                "eligibility",
                "application_deadline",
                "link"
              ]
            }
          }
        },
        required: [
          "project_name",
          "sustainability_score",
          "feasibility_report",
          "risk_analysis",
          "policy_compliance",
          "funding_opportunities",
          "api_context_data"
        ]
      },
    };

    const chatSession = model.startChat({
      generationConfig: {
        ...generationConfig,
        responseSchema: generationConfig.responseSchema as any
      },
      history: [
      ],
    });

    const result = await chatSession.sendMessage(
      `LOCATION: \n${location_name}\n\nPROJECT:\n${project_idea}\n\nPROJECT RADIUS:\n${radius} meters\n\nAPI CONTEXT:\n${apiContext}\n`
    );

    // Parse the Gemini response
    const projectData = JSON.parse(result.response.text()) as ProjectData;
    // Update with actual location data and images.
    const updatedProjectData = {
      ...projectData,
      location: {
        ...projectData.location,
        latitude: latitude,
        longitude: longitude,
        city: city,
        country: country,
        images: locationImages
      },
      last_updated: new Date().toISOString()
    };

    return NextResponse.json(updatedProjectData);
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}

