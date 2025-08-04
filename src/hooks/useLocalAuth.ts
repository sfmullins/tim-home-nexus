import { useState, useEffect } from 'react';
import { localAuth, LocalUser, LocalSession } from '@/lib/localAuth';

export const useLocalAuth = () => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [session, setSession] = useState<LocalSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const currentSession = localAuth.getCurrentSession();
    const currentUser = localAuth.getCurrentUser();
    
    setSession(currentSession);
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await localAuth.login(email, password);
    if (result.user && result.session) {
      setUser(result.user);
      setSession(result.session);
    }
    return result;
  };

  const register = async (email: string, password: string, username: string, deviceName: string) => {
    const result = await localAuth.register(email, password, username, deviceName);
    if (result.user) {
      // Auto-login after registration
      const loginResult = await localAuth.login(email, password);
      if (loginResult.user && loginResult.session) {
        setUser(loginResult.user);
        setSession(loginResult.session);
      }
    }
    return result;
  };

  const logout = () => {
    localAuth.logout();
    setUser(null);
    setSession(null);
  };

  const hasAnyUsers = () => {
    return localAuth.hasAnyUsers();
  };

  return {
    user,
    session,
    loading,
    login,
    register,
    logout,
    hasAnyUsers,
    isAuthenticated: !!user && !!session
  };
};