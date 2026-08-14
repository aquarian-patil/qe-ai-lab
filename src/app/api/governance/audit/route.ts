import { NextResponse } from 'next/server';
import { AuditLogger } from '@/lib/qe-engine/governance/AuditLogger';

export async function GET() {
  const logger = AuditLogger.getInstance();
  return NextResponse.json({ logs: logger.getLogs() });
}
