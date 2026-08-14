import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';

export type TShirtSize = 'S' | 'M' | 'L' | 'XL';

export interface LoadProfile {
  vus: number;
  duration: string;
  rampUp: string;
}

export class NfrPipeline {
  private ai: GoogleGenAI;
  
  private profiles: Record<TShirtSize, LoadProfile> = {
    'S': { vus: 50, duration: '5m', rampUp: '1m' }, // Smoke
    'M': { vus: 500, duration: '15m', rampUp: '5m' }, // Standard
    'L': { vus: 5000, duration: '1h', rampUp: '15m' }, // Peak
    'XL': { vus: 20000, duration: '10m', rampUp: '10s' } // Stress/Spike
  };

  constructor() {
    this.ai = new GoogleGenAI({});
  }

  /**
   * Autonomously writes a k6 load test based on the T-Shirt size profile
   */
  async generateLoadTest(targetUrl: string, size: TShirtSize): Promise<string> {
    const profile = this.profiles[size];
    console.log(`[NfrPipeline] Initiating ${size} Load Test Generation (${profile.vus} VUs) for ${targetUrl}`);

    const prompt = `You are a Performance Engineer. Write a complete k6 load testing script in JavaScript.
Target URL: ${targetUrl}
Virtual Users (VUs): ${profile.vus}
Sustained Duration: ${profile.duration}
Ramp-up Time: ${profile.rampUp}

Requirements:
1. Include a realistic options object with stages for ramp-up, sustain, and ramp-down.
2. Include checks for HTTP 200 and response time < 500ms.
3. Include thresholds (p(95) < 500).
4. Output ONLY the raw JavaScript code. Do not wrap in markdown or backticks.`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [prompt],
      });

      const scriptCode = response.text?.replace(/```javascript/g, '').replace(/```js/g, '').replace(/```/g, '').trim() || '';

      const testDir = path.join(process.cwd(), 'tests', 'performance');
      if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
      }

      const filePath = path.join(testDir, `load_test_${size.toLowerCase()}.js`);
      fs.writeFileSync(filePath, scriptCode);
      
      console.log(`[NfrPipeline] Generated k6 script successfully at ${filePath}`);
      return filePath;
    } catch (error) {
      console.error(`[NfrPipeline] Failed to generate load test:`, error);
      throw error;
    }
  }

  /**
   * If a load test crashes the server, this method allows the AI to automatically
   * dial back the VU ramp-up rate and retry.
   */
  async selfTuneLoadTest(scriptPath: string, failureReason: string): Promise<boolean> {
    console.log(`[NfrPipeline] Self-Tuning engaged. Server crashed: ${failureReason}`);
    
    const oldCode = fs.readFileSync(scriptPath, 'utf8');
    const prompt = `You are an Autonomous NFR Agent. The following k6 load test crashed the target server.
Reason: ${failureReason}

Original Code:
${oldCode}

Task: Rewrite the script to be more gentle. Reduce the target VUs by 50% and double the ramp-up duration.
Output ONLY the raw JavaScript code. Do not wrap in markdown or backticks.`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [prompt],
      });
      const tunedCode = response.text?.replace(/```javascript/g, '').replace(/```js/g, '').replace(/```/g, '').trim() || '';
      
      fs.writeFileSync(scriptPath, tunedCode);
      console.log(`[NfrPipeline] Self-Tuning SUCCESS: Rewrote k6 script with reduced load.`);
      return true;
    } catch (error) {
      console.error(`[NfrPipeline] Self-Tuning FAILED:`, error);
      return false;
    }
  }
}
