import { GoogleGenAI } from '@google/genai';
import { IntegrationFactory, IGitProvider } from '../integrations/core/IntegrationFactory';
import * as fs from 'fs';
import * as path from 'path';

export class SecurityPipeline {
  private ai: GoogleGenAI;
  private gitProvider: IGitProvider;

  constructor() {
    this.ai = new GoogleGenAI({});
    this.gitProvider = IntegrationFactory.getInstance().getGitProvider();
  }

  /**
   * Simulates the ingestion of a DAST/SAST report (e.g., OWASP ZAP or SonarQube)
   * In a real pipeline, this would parse a JSON artifact from the CI run.
   */
  async ingestSecurityReport(reportData: string, targetFile: string): Promise<boolean> {
    console.log(`[SecurityPipeline] Ingesting vulnerability report for ${targetFile}...`);
    
    // Check if remediation is needed
    if (reportData.includes('HIGH') || reportData.includes('CRITICAL')) {
      console.log(`[SecurityPipeline] CRITICAL vulnerability detected. Engaging auto-remediation...`);
      return await this.remediateVulnerability(targetFile, reportData);
    }
    
    console.log(`[SecurityPipeline] No critical vulnerabilities found. Passing security gate.`);
    return true;
  }

  /**
   * Reads the vulnerable source code and uses Gemini to write a secure patch
   */
  async remediateVulnerability(filePath: string, vulnerabilityDetails: string): Promise<boolean> {
    if (!fs.existsSync(filePath)) {
      console.error(`[SecurityPipeline] Target file not found: ${filePath}`);
      return false;
    }

    const oldCode = fs.readFileSync(filePath, 'utf8');
    const prompt = `You are an Autonomous AppSec Agent. A critical vulnerability was found in the following code.
Vulnerability Details: ${vulnerabilityDetails}

Original Code:
${oldCode}

Task: Rewrite the entire file to patch this security flaw (e.g. parameterize SQL queries, sanitize inputs, prevent XSS).
Ensure the core functionality remains identical. 
Output ONLY the raw code. Do not wrap in markdown or backticks.`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [prompt],
      });
      
      const secureCode = response.text?.replace(/```[a-z]*\n/gi, '').replace(/```/g, '').trim() || '';
      
      fs.writeFileSync(filePath, secureCode);
      console.log(`[SecurityPipeline] Auto-Remediation SUCCESS: Patched vulnerability in ${filePath}`);
      
      const branchName = `security-patch-${Date.now()}`;
      await this.gitProvider.createBranch(branchName);
      await this.gitProvider.commitCode(branchName, filePath, secureCode, "Auto-remediated critical vulnerability");
      await this.gitProvider.createPullRequest(
        branchName, 
        "main", 
        "🚨 Security Auto-Patch: Remediation Applied", 
        "The Agentic Engine has autonomously patched a critical vulnerability detected by DAST/SAST. Please review."
      );

      return true;
    } catch (error) {
      console.error(`[SecurityPipeline] Auto-Remediation FAILED:`, error);
      return false;
    }
  }
}
