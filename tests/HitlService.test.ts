import { HitlService } from '../src/lib/qe-engine/governance/HitlService';
import * as fs from 'fs';
import * as path from 'path';

describe('HitlService', () => {
  let hitlService: HitlService;
  const dbPath = path.join(process.cwd(), 'data', 'hitl_queue.json');

  beforeEach(() => {
    hitlService = HitlService.getInstance();
    // Clean up test data if necessary, though it shares the local data file for now.
    // In a real scenario, we'd mock fs or use a test DB path.
  });

  it('should be a singleton', () => {
    const instance1 = HitlService.getInstance();
    const instance2 = HitlService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should create a new pending approval request', () => {
    const reqId = hitlService.requestApproval('TestPipeline', 'Test destructive action', 'HIGH');
    expect(reqId).toMatch(/^REQ-\d+$/);

    const pending = hitlService.getPendingRequests();
    const found = pending.find(p => p.id === reqId);
    expect(found).toBeDefined();
    expect(found?.pipeline).toBe('TestPipeline');
    expect(found?.status).toBe('PENDING');
  });

  it('should resolve a request to APPROVED', () => {
    const reqId = hitlService.requestApproval('TestPipeline2', 'Approve me', 'LOW');
    const success = hitlService.resolveRequest(reqId, 'APPROVED');
    expect(success).toBe(true);

    const pending = hitlService.getPendingRequests();
    const found = pending.find(p => p.id === reqId);
    expect(found).toBeUndefined(); // No longer pending
  });
});
