import { describe, it, expect } from '@jest/globals';

describe('Single Agent Trajectory Execution', () => {
  it('should complete a standard Thought -> Action -> Observation loop', async () => {
    const agentTrace = [
      { step: 1, type: 'THOUGHT', content: 'I need to check the current directory contents.' },
      { step: 2, type: 'ACTION', command: 'ls -la' },
      { step: 3, type: 'OBSERVATION', result: 'total 0' },
      { step: 4, type: 'FINAL_ANSWER', content: 'The directory is empty.' }
    ];

    expect(agentTrace[1].type).toBe('ACTION');
    expect(agentTrace[3].type).toBe('FINAL_ANSWER');
  });
});
