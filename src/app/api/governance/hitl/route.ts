import { NextResponse } from 'next/server';
import { HitlService } from '@/lib/qe-engine/governance/HitlService';

export async function GET() {
  const service = HitlService.getInstance();
  return NextResponse.json({ queue: service.getPendingRequests() });
}

export async function POST(req: Request) {
  const { id, action } = await req.json();
  const service = HitlService.getInstance();
  const success = service.resolveRequest(id, action);
  return NextResponse.json({ success });
}
