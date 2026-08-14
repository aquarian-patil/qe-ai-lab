import { NextResponse } from 'next/server';
import { AgenticPipeline } from '@/lib/qe-engine/AgenticPipeline';
import { MaturityScoringService } from '@/lib/qe-engine/MaturityScoringService';

export async function GET() {
  try {
    const maturityService = new MaturityScoringService();
    const metrics = maturityService.getMetrics();
    return NextResponse.json({ success: true, metrics });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, domain, gitDiff, testPath, errorMessage, domSnapshot } = body;

    const pipeline = new AgenticPipeline();

    if (action === 'generate') {
      if (!domain || !gitDiff) {
        return NextResponse.json({ error: 'Missing domain or gitDiff for generation' }, { status: 400 });
      }
      
      const filePath = await pipeline.generateTestsFromDiff(domain, gitDiff);
      return NextResponse.json({ success: true, message: 'Tests generated', filePath });
    } 
    
    if (action === 'heal') {
      if (!testPath || !errorMessage || !domSnapshot) {
        return NextResponse.json({ error: 'Missing testPath, errorMessage, or domSnapshot for self-healing' }, { status: 400 });
      }

      const healed = await pipeline.selfHealTest(testPath, errorMessage, domSnapshot);
      return NextResponse.json({ success: true, healed, message: healed ? 'Test healed successfully' : 'Defect logged to Jira' });
    }

    return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });

  } catch (error: any) {
    console.error('Pipeline API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
