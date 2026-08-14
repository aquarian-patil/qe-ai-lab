import * as fs from 'fs';
import * as path from 'path';

export type UserRole = 'Viewer' | 'Engineer' | 'Admin';

export interface UserSession {
  userId: string;
  name: string;
  role: UserRole;
}

export class AuthService {
  private static instance: AuthService;
  private currentSession: UserSession;

  private constructor() {
    // Mocking an active session. In production, this verifies a JWT from Okta/Entra.
    this.currentSession = {
      userId: 'USR-1092',
      name: 'System Admin',
      role: 'Admin'
    };
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public getCurrentUser(): UserSession {
    return this.currentSession;
  }

  public hasPermission(requiredRole: UserRole): boolean {
    const roleHierarchy = { 'Viewer': 1, 'Engineer': 2, 'Admin': 3 };
    return roleHierarchy[this.currentSession.role] >= roleHierarchy[requiredRole];
  }

  // A dev-only method to toggle roles for UI testing
  public mockSetRole(role: UserRole) {
    this.currentSession.role = role;
  }
}
