import { NextResponse } from 'next/server';
import { GenesisOrchestrator } from '@/lib/qe-engine/GenesisOrchestrator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { input, fileData } = body;

    if (!input && !fileData) {
      return NextResponse.json({ error: 'Missing input requirement or file' }, { status: 400 });
    }

    const orchestrator = new GenesisOrchestrator();
    const result = await orchestrator.processRequirement(input, fileData);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Genesis API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
