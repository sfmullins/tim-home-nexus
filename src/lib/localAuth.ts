// Local authentication system for TIM
export interface LocalUser {
  id: string;
  email: string;
  username: string;
  deviceName: string;
  createdAt: string;
  hashedPassword: string;
}

export interface LocalSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

class LocalAuthManager {
  private readonly USERS_KEY = 'tim-local-users';
  private readonly SESSIONS_KEY = 'tim-local-sessions';
  private readonly CURRENT_SESSION_KEY = 'tim-current-session';

  // Generate a simple hash (for demo - in production use proper crypto)
  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'tim-salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private generateId(): string {
    return crypto.randomUUID();
  }

  private generateToken(): string {
    return btoa(crypto.randomUUID() + Date.now()).replace(/[^a-zA-Z0-9]/g, '');
  }

  private getUsers(): LocalUser[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: LocalUser[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  private getSessions(): LocalSession[] {
    const sessions = localStorage.getItem(this.SESSIONS_KEY);
    return sessions ? JSON.parse(sessions) : [];
  }

  private saveSessions(sessions: LocalSession[]): void {
    localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
  }

  private isSessionValid(session: LocalSession): boolean {
    return new Date(session.expiresAt) > new Date();
  }

  async register(email: string, password: string, username: string, deviceName: string): Promise<{ user?: LocalUser; error?: string }> {
    const users = this.getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return { error: 'User already exists with this email' };
    }

    const hashedPassword = await this.hashPassword(password);
    const user: LocalUser = {
      id: this.generateId(),
      email,
      username,
      deviceName,
      hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    this.saveUsers(users);

    return { user };
  }

  async login(email: string, password: string): Promise<{ user?: LocalUser; session?: LocalSession; error?: string }> {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return { error: 'Invalid email or password' };
    }

    const hashedPassword = await this.hashPassword(password);
    if (hashedPassword !== user.hashedPassword) {
      return { error: 'Invalid email or password' };
    }

    // Create session
    const session: LocalSession = {
      id: this.generateId(),
      userId: user.id,
      token: this.generateToken(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      createdAt: new Date().toISOString()
    };

    const sessions = this.getSessions();
    sessions.push(session);
    this.saveSessions(sessions);

    // Save current session
    localStorage.setItem(this.CURRENT_SESSION_KEY, JSON.stringify(session));

    return { user, session };
  }

  getCurrentSession(): LocalSession | null {
    const currentSession = localStorage.getItem(this.CURRENT_SESSION_KEY);
    if (!currentSession) return null;

    const session: LocalSession = JSON.parse(currentSession);
    return this.isSessionValid(session) ? session : null;
  }

  getCurrentUser(): LocalUser | null {
    const session = this.getCurrentSession();
    if (!session) return null;

    const users = this.getUsers();
    return users.find(u => u.id === session.userId) || null;
  }

  logout(): void {
    const currentSession = this.getCurrentSession();
    if (currentSession) {
      // Remove from sessions
      const sessions = this.getSessions();
      const filteredSessions = sessions.filter(s => s.id !== currentSession.id);
      this.saveSessions(filteredSessions);
    }

    localStorage.removeItem(this.CURRENT_SESSION_KEY);
  }

  hasAnyUsers(): boolean {
    return this.getUsers().length > 0;
  }
}

export const localAuth = new LocalAuthManager();