import * as fs from 'fs';
import * as path from 'path';
import { AuditLogger } from './AuditLogger';

export interface PendingApproval {
  id: string;
  requestedAt: string;
  pipeline: string;
  description: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export class HitlService {
  private static instance: HitlService;
  private dbPath: string;

  private constructor() {
    this.dbPath = path.join(process.cwd(), 'data', 'hitl_queue.json');
    if (!fs.existsSync(path.dirname(this.dbPath))) {
      fs.mkdirSync(path.dirname(this.dbPath), { recursive: true });
    }
    if (!fs.existsSync(this.dbPath)) {
      // Pre-seed with some dummy data for the UI
      fs.writeFileSync(this.dbPath, JSON.stringify([
        {
          id: 'REQ-901',
          requestedAt: new Date(Date.now() - 3600000).toISOString(),
          pipeline: 'SecurityPipeline',
          description: 'Deploy auto-remediated patch for CVE-2024-1092 to Main Branch',
          riskLevel: 'HIGH',
          status: 'PENDING'
        },
        {
          id: 'REQ-902',
          requestedAt: new Date(Date.now() - 7200000).toISOString(),
          pipeline: 'NfrPipeline',
          description: 'Execute XL Load Test (20,000 VUs) against Production Environment',
          riskLevel: 'CRITICAL',
          status: 'PENDING'
        }
      ]));
    }
  }

  public static getInstance(): HitlService {
    if (!HitlService.instance) {
      HitlService.instance = new HitlService();
    }
    return HitlService.instance;
  }

  public requestApproval(pipeline: string, description: string, riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'): string {
    const reqId = `REQ-${Date.now()}`;
    const newReq: PendingApproval = {
      id: reqId,
      requestedAt: new Date().toISOString(),
      pipeline,
      description,
      riskLevel,
      status: 'PENDING'
    };

    const queue: PendingApproval[] = JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
    queue.push(newReq);
    fs.writeFileSync(this.dbPath, JSON.stringify(queue, null, 2));
    
    AuditLogger.getInstance().logAction('HITL Approval Requested', description, 'PENDING_APPROVAL');
    return reqId;
  }

  public getPendingRequests(): PendingApproval[] {
    const queue: PendingApproval[] = JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
    return queue.filter(q => q.status === 'PENDING').sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
  }

  public resolveRequest(id: string, action: 'APPROVED' | 'REJECTED'): boolean {
    const queue: PendingApproval[] = JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
    const req = queue.find(q => q.id === id);
    if (!req) return false;
    
    req.status = action;
    fs.writeFileSync(this.dbPath, JSON.stringify(queue, null, 2));
    
    AuditLogger.getInstance().logAction(`HITL ${action}`, req.description, action === 'APPROVED' ? 'SUCCESS' : 'FAILURE');
    return true;
  }
}
