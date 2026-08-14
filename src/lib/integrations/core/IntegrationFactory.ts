// Core Interfaces
export interface IIssueTracker {
  logDefect(title: string, description: string, evidence?: string): Promise<string>;
  updateTicket(ticketId: string, comment: string): Promise<boolean>;
}

export interface IGitProvider {
  createBranch(branchName: string): Promise<boolean>;
  commitCode(branchName: string, filePath: string, content: string, message: string): Promise<string>;
  createPullRequest(sourceBranch: string, targetBranch: string, title: string, body: string): Promise<string>;
}

export interface IDatabaseProvider {
  executeQuery(query: string, params?: any[]): Promise<any>;
  provisionTestData(datasetName: string): Promise<boolean>;
  teardownTestData(datasetName: string): Promise<boolean>;
}

// Concrete Adapters would go in their respective files (e.g. JiraAdapter.ts, GitHubAdapter.ts)
// For scaffolding, we will simulate them returning successful API resolutions

class JiraAdapter implements IIssueTracker {
  async logDefect(title: string, description: string) {
    console.log(`[JiraAdapter] POST /rest/api/3/issue - Created Bug: ${title}`);
    return "QE-101";
  }
  async updateTicket(ticketId: string, comment: string) {
    console.log(`[JiraAdapter] PUT /rest/api/3/issue/${ticketId} - Updated ticket`);
    return true;
  }
}

class AzureDevOpsAdapter implements IIssueTracker {
  async logDefect(title: string, description: string) {
    console.log(`[ADOAdapter] POST /_apis/wit/workitems - Created Bug: ${title}`);
    return "BUG-992";
  }
  async updateTicket(ticketId: string, comment: string) { return true; }
}

class GitHubAdapter implements IGitProvider {
  async createBranch(branchName: string) {
    console.log(`[GitHubAdapter] POST /repos/{owner}/{repo}/git/refs - Created branch ${branchName}`);
    return true;
  }
  async commitCode(branch: string, file: string, content: string, msg: string) {
    console.log(`[GitHubAdapter] PUT /repos/{owner}/{repo}/contents/${file} - Committed to ${branch}`);
    return "commit_hash_123";
  }
  async createPullRequest(src: string, target: string, title: string) {
    console.log(`[GitHubAdapter] POST /repos/{owner}/{repo}/pulls - Created PR: ${title}`);
    return "https://github.com/org/repo/pull/1";
  }
}

class PostgresAdapter implements IDatabaseProvider {
  async executeQuery(query: string) {
    console.log(`[PostgresAdapter] Executing: ${query.substring(0, 50)}...`);
    return [];
  }
  async provisionTestData(datasetName: string) { return true; }
  async teardownTestData(datasetName: string) { return true; }
}

class MongoAdapter implements IDatabaseProvider {
  async executeQuery(query: string) {
    console.log(`[MongoAdapter] db.collection.find(...)`);
    return [];
  }
  async provisionTestData(datasetName: string) { return true; }
  async teardownTestData(datasetName: string) { return true; }
}

// The Factory
export class IntegrationFactory {
  private static instance: IntegrationFactory;

  private constructor() {}

  public static getInstance(): IntegrationFactory {
    if (!IntegrationFactory.instance) {
      IntegrationFactory.instance = new IntegrationFactory();
    }
    return IntegrationFactory.instance;
  }

  public getIssueTracker(): IIssueTracker {
    // In a real app, this reads process.env.ISSUE_TRACKER_PROVIDER
    const provider = process.env.ISSUE_TRACKER_PROVIDER || 'jira';
    return provider === 'azure' ? new AzureDevOpsAdapter() : new JiraAdapter();
  }

  public getGitProvider(): IGitProvider {
    const provider = process.env.GIT_PROVIDER || 'github';
    return provider === 'gitlab' ? new GitHubAdapter() /* pretend gitlab */ : new GitHubAdapter();
  }

  public getDatabaseProvider(): IDatabaseProvider {
    const provider = process.env.DB_PROVIDER || 'postgres';
    return provider === 'mongo' ? new MongoAdapter() : new PostgresAdapter();
  }
}
