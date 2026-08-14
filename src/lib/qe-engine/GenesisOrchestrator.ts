import { GoogleGenAI } from '@google/genai';

export interface GenesisResult {
  productDocs: string;
  frontendCode: string;
  backendSql: string;
  qaTests: string;
  devOpsConfig: string;
  apiSpecs: string;
  mobileCode: string;
  infraCost: string;
}

export class GenesisOrchestrator {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({});
  }

  async processRequirement(input: string, fileData?: { mimeType: string, base64: string }): Promise<GenesisResult> {
    console.log(`[GenesisOrchestrator] Igniting Omni-Ingestion for new requirement...`);
    
    const prompt = `You are the Genesis Engine, an autonomous software factory. 
Analyze the following unstructured requirement. Your task is to generate the complete software lifecycle for this requirement.

Return a raw JSON object with the following exact keys (NO MARKDOWN WRAPPING):
- "productDocs": Gherkin BDD scenarios for the requirement.
- "frontendCode": A React Tailwind component implementing the UI.
- "backendSql": PostgreSQL queries to build the schema for this feature.
- "qaTests": Playwright UI tests for the feature.
- "devOpsConfig": A GitHub Actions YAML file to deploy it.
- "apiSpecs": OpenAPI/Swagger YAML specifications for any necessary REST APIs.
- "mobileCode": React Native code implementing the mobile version of this requirement.
- "infraCost": A detailed Infrastructure Cost Forecast (in Markdown). Based on standard enterprise load (e.g. 5000 users), list the exact required cloud architecture (AWS EC2 types, memory, DB tiers) and estimated monthly pricing.

Requirement Input:
${input}`;

    const contents = [];
    if (fileData) {
      contents.push({
        inlineData: {
          mimeType: fileData.mimeType,
          data: fileData.base64
        }
      });
    }
    contents.push(prompt);

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: contents,
      });

      let text = response.text || '';
      // Clean up markdown if the AI includes it despite instructions
      text = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
      
      const result = JSON.parse(text) as GenesisResult;
      console.log(`[GenesisOrchestrator] Successfully generated SDLC matrix.`);
      return result;
    } catch (error) {
      console.error(`[GenesisOrchestrator] Core failure:`, error);
      throw new Error('Failed to ignite Genesis Engine. Ensure GEMINI_API_KEY is set and input is valid.');
    }
  }
}
