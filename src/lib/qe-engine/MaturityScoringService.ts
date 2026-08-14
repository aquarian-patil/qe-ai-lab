import * as fs from 'fs';
import * as path from 'path';

export interface MaturityMetrics {
  codeQuality: { score: number; lintErrors: number; coverage: number };
  agenticTesting: { score: number; testsGenerated: number; selfHealSuccessRate: number };
  cicd: { score: number; deployFreqPerDay: number; zeroTouchPercentage: number };
  securityNfr: { score: number; vulnerabilities: number; loadTestPassRate: number };
  blendedScore: number;
  maturityLevel: number;
  levelName: string;
}

export class MaturityScoringService {
  private dataPath = path.join(process.cwd(), 'data', 'maturity.json');

  constructor() {
    if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
      fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true });
    }
    if (!fs.existsSync(this.dataPath)) {
      this.initializeMockData();
    }
  }

  private initializeMockData() {
    const initialData: MaturityMetrics = {
      codeQuality: { score: 75, lintErrors: 12, coverage: 78 },
      agenticTesting: { score: 85, testsGenerated: 1204, selfHealSuccessRate: 92 },
      cicd: { score: 60, deployFreqPerDay: 4, zeroTouchPercentage: 45 },
      securityNfr: { score: 70, vulnerabilities: 3, loadTestPassRate: 98 },
      blendedScore: 72.5,
      maturityLevel: 3,
      levelName: 'Autonomous'
    };
    fs.writeFileSync(this.dataPath, JSON.stringify(initialData, null, 2));
  }

  public getMetrics(): MaturityMetrics {
    const data = fs.readFileSync(this.dataPath, 'utf8');
    return JSON.parse(data) as MaturityMetrics;
  }

  // Called when pipeline actions occur to dynamically shift the score
  public recordAgenticSuccess() {
    const metrics = this.getMetrics();
    metrics.agenticTesting.testsGenerated += 1;
    metrics.agenticTesting.selfHealSuccessRate = Math.min(100, metrics.agenticTesting.selfHealSuccessRate + 0.1);
    this.recalculateScore(metrics);
  }

  public recordAgenticFailure() {
    const metrics = this.getMetrics();
    metrics.agenticTesting.selfHealSuccessRate = Math.max(0, metrics.agenticTesting.selfHealSuccessRate - 0.5);
    this.recalculateScore(metrics);
  }

  private recalculateScore(metrics: MaturityMetrics) {
    // Dynamic calculation
    metrics.agenticTesting.score = Math.round((metrics.agenticTesting.selfHealSuccessRate + (metrics.agenticTesting.testsGenerated > 1000 ? 100 : metrics.agenticTesting.testsGenerated / 10)) / 2);
    
    metrics.blendedScore = (metrics.codeQuality.score + metrics.agenticTesting.score + metrics.cicd.score + metrics.securityNfr.score) / 4;
    
    if (metrics.blendedScore >= 95) { metrics.maturityLevel = 5; metrics.levelName = 'Absolute Autonomy'; }
    else if (metrics.blendedScore >= 80) { metrics.maturityLevel = 4; metrics.levelName = 'Predictive'; }
    else if (metrics.blendedScore >= 60) { metrics.maturityLevel = 3; metrics.levelName = 'Autonomous'; }
    else if (metrics.blendedScore >= 40) { metrics.maturityLevel = 2; metrics.levelName = 'Automated'; }
    else { metrics.maturityLevel = 1; metrics.levelName = 'Foundational'; }

    fs.writeFileSync(this.dataPath, JSON.stringify(metrics, null, 2));
  }
}
