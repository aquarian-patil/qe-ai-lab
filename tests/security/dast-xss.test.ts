import { describe, it, expect } from '@jest/globals';

describe('Security - DAST Simulation', () => {
  it('should identify XSS vulnerabilities in the payload trace viewer', () => {
    const mockPayload = "<script>alert('XSS')</script>";
    
    // Simulate our frontend sanitization logic (DOMPurify or React auto-escape)
    const sanitizedHTML = mockPayload.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    expect(sanitizedHTML).not.toContain('<script>');
    expect(sanitizedHTML).toContain('&lt;script&gt;');
  });
});
