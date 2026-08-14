import { AuthService, UserRole } from '../src/lib/qe-engine/governance/AuthService';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    // Reset instance between tests if possible, or just grab the singleton
    authService = AuthService.getInstance();
    // Default to admin for base tests
    authService.mockSetRole('Admin');
  });

  it('should be a singleton', () => {
    const instance1 = AuthService.getInstance();
    const instance2 = AuthService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should return the current user session', () => {
    const user = authService.getCurrentUser();
    expect(user).toHaveProperty('userId');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('role');
  });

  it('should enforce role hierarchies correctly (Admin)', () => {
    authService.mockSetRole('Admin');
    expect(authService.hasPermission('Viewer')).toBe(true);
    expect(authService.hasPermission('Engineer')).toBe(true);
    expect(authService.hasPermission('Admin')).toBe(true);
  });

  it('should enforce role hierarchies correctly (Viewer)', () => {
    authService.mockSetRole('Viewer');
    expect(authService.hasPermission('Viewer')).toBe(true);
    expect(authService.hasPermission('Engineer')).toBe(false);
    expect(authService.hasPermission('Admin')).toBe(false);
  });
});
