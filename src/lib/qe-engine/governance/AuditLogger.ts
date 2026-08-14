import * as fs from 'fs';
import * as path from 'path';
import { AuthService } from './AuthService';

export interface AuditRecord {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  action: string;
  target: string;
  status: 'SUCCESS' | 'FAILURE' | 'PENDING_APPROVAL';
}

export class AuditLogger {
  private static instance: AuditLogger;
  private logFilePath: string;

  private constructor() {
    this.logFilePath = path.join(process.cwd(), 'data', 'audit_log.json');
    if (!fs.existsSync(path.dirname(this.logFilePath))) {
      fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true });
    }
    if (!fs.existsSync(this.logFilePath)) {
      fs.writeFileSync(this.logFilePath, JSON.stringify([]));
    }
  }

  public static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  public async logAction(action: string, target: string, status: 'SUCCESS' | 'FAILURE' | 'PENDING_APPROVAL'): Promise<void> {
    const user = AuthService.getInstance().getCurrentUser();
    const record: AuditRecord = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorId: user.userId,
      actorName: user.name, // Will log 'System Admin' or 'AI System'
      action,
      target,
      status
    };

    const logs: AuditRecord[] = JSON.parse(fs.readFileSync(this.logFilePath, 'utf8'));
    logs.unshift(record); // Add to top
    
    // Keep last 1000 records
    if (logs.length > 1000) logs.pop();
    
    fs.writeFileSync(this.logFilePath, JSON.stringify(logs, null, 2));
    console.log(`[AuditLogger] Recorded: ${action} on ${target} [${status}]`);
  }

  public getLogs(): AuditRecord[] {
    return JSON.parse(fs.readFileSync(this.logFilePath, 'utf8'));
  }
}
