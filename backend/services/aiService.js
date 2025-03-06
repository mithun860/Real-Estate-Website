import axios from "axios";
import { config } from "../config/config.js";

class AIService {
  constructor() {
    this.modelId = config.modelId;
    this.huggingfaceApiKey = config.huggingfaceApiKey;
    this.modelLoaded = false; // Track if model has been loaded
  }

  async generateText(prompt) {
    try {
      const API_URL = `https://api-inference.huggingface.co/models/${this.modelId}`;

      const startTime = Date.now();
      console.log(`Starting AI generation at ${new Date().toISOString()}`);

      const response = await axios.post(
        API_URL,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 800,
            return_full_text: false,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.huggingfaceApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const endTime = Date.now();
      console.log(
        `AI generation completed in ${(endTime - startTime) / 1000} seconds`
      );
      this.modelLoaded = true; // Mark model as loaded for future requests

      if (response.status !== 200) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = response.data;
      if (Array.isArray(result) && result.length > 0) {
        return result[0].generated_text;
      }

      return "Error: Unexpected response format from AI model";
    } catch (error) {
      console.error("Error generating text:", error);
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error.toLowerCase();
        if (
          errorMessage.includes("waiting") ||
          errorMessage.includes("loading")
        ) {
          console.log("Model is loading...");
          return "The AI model is currently loading. This typically takes 15-30 seconds for the first analysis. Your results will be worth the wait!";
        }
      }
      return `Error: ${error.message}`;
    }
  }

  async analyzeProperties(
    properties,
    city,
    maxPrice,
    propertyCategory,
    propertyType
  ) {
    const prompt = `As a real estate expert, analyze these properties:

        Properties Found in ${city}:
        ${JSON.stringify(properties, null, 2)}

        INSTRUCTIONS:
        1. Focus ONLY on these properties that match:
           - Property Category: ${propertyCategory}
           - Property Type: ${propertyType}
           - Maximum Price: ${maxPrice} crores
        2. Provide a brief analysis with these sections:
           - Property Overview (basic facts about each)
           - Best Value Analysis (which offers the best value)
           - Quick Recommendations

        Keep your response concise and focused on these properties only.
        `;

    return this.generateText(prompt);
  }

  async analyzeLocationTrends(locations, city) {
    const prompt = `As a real estate expert, analyze these location price trends for ${city}:

        ${JSON.stringify(locations, null, 2)}

        Please provide:
        1. A brief summary of price trends for each location
        2. Which areas are showing the highest appreciation
        3. Which areas offer the best rental yield
        4. Quick investment recommendations based on this data

        Keep your response concise (maximum 300 words).
        `;

    return this.generateText(prompt);
  }
}

export default new AIService();
