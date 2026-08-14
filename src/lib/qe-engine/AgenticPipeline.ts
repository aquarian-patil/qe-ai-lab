import { IntegrationFactory, IIssueTracker } from '../integrations/core/IntegrationFactory';
import { GoogleGenAI } from '@google/genai';
import { MaturityScoringService } from './MaturityScoringService';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Agentic QE Pipeline Brain
 */
export class AgenticPipeline {
  private issueTracker: IIssueTracker;
  private ai: GoogleGenAI;
  private maturity: MaturityScoringService;

  constructor() {
    this.issueTracker = IntegrationFactory.getInstance().getIssueTracker();
    this.maturity = new MaturityScoringService();
    // Initialize Gemini SDK. Expects GEMINI_API_KEY env var
    this.ai = new GoogleGenAI({});
  }

  /**
   * Reads a git diff and autonomously writes test files.
   * @param domain - The feature domain (e.g., 'dashboard')
   * @param gitDiff - The raw git diff string
   */
  async generateTestsFromDiff(domain: string, gitDiff: string) {
    console.log(`[AgenticPipeline] Analyzing git diff for domain: ${domain}...`);
    
    try {
      const prompt = `You are an expert SDET writing Playwright UI tests. 
Review the following git diff and write a complete Playwright test suite to cover the new or changed functionality.
Only output the raw TypeScript code, no markdown wrappers.
Diff:
${gitDiff}`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      const testCode = response.text || '';
      const safeCode = testCode.replace(/```typescript/g, '').replace(/```/g, '').trim();

      const testDir = path.join(process.cwd(), 'tests', 'functional', 'ui', domain);
      if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
      }

      const filePath = path.join(testDir, `${domain}.spec.ts`);
      fs.writeFileSync(filePath, safeCode);
      console.log(`[AgenticPipeline] Generated tests for ${domain} successfully at ${filePath}`);
      this.maturity.recordAgenticSuccess();
      return filePath;
    } catch (error) {
      console.error(`[AgenticPipeline] Failed to generate tests:`, error);
      throw error;
    }
  }

  /**
   * The core Self-Healing loop. Intercepts Playwright errors and rewrites the test.
   * @param testPath - The path to the failing test file
   * @param errorMessage - The Playwright error
   * @param domSnapshot - A dump of the DOM when the test failed
   */
  async selfHealTest(testPath: string, errorMessage: string, domSnapshot: string) {
    console.log(`[AgenticPipeline] Attempting to self-heal: ${testPath}`);
    
    try {
      const existingCode = fs.readFileSync(testPath, 'utf8');
      
      const prompt = `You are an autonomous Self-Healing agent. A Playwright test failed.
Analyze the Error Message and the DOM Snapshot, then rewrite the test code to fix the broken locators or logic.
Only output the raw TypeScript code, no markdown wrappers. If the defect is in the application code (not the test), return exactly "DEFECT".

Error Message:
${errorMessage}

DOM Snapshot:
${domSnapshot}

Failing Test Code:
${existingCode}`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      const newCode = response.text?.trim() || '';
      
      if (newCode === 'DEFECT' || newCode.includes('DEFECT')) {
        console.log(`[AgenticPipeline] Self-Heal FAILED (Application Defect). Engaging Enterprise Integrations...`);
        await this.issueTracker.logDefect(
          `AI Self-Heal Failure: Unhealable Defect in ${testPath}`,
          errorMessage
        );
        this.maturity.recordAgenticFailure();
        return false;
      }

      const safeCode = newCode.replace(/```typescript/g, '').replace(/```/g, '').trim();
      fs.writeFileSync(testPath, safeCode);
      console.log(`[AgenticPipeline] Self-Heal SUCCESS: Rewrote locator in ${testPath}`);
      this.maturity.recordAgenticSuccess();
      return true;
      
    } catch (error) {
       console.error(`[AgenticPipeline] Self-healing failed:`, error);
       throw error;
    }
  }
}
