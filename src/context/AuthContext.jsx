import { createContext, useContext, useEffect, useState } from 'react';
import {
  login as loginService,
  logout as logoutService,
  getCurrentUser,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setIsAuthLoading(false);
  }, []);

  const login = (email, password) => {
    const result = loginService(email, password);

    if (result.success) {
      setCurrentUser(result.user);
    }

    return result;
  };

  const logout = () => {
    logoutService();
    setCurrentUser(null);
  };

  const hasRole = (allowedRoles = []) => {
    if (allowedRoles.length === 0) {
      return true;
    }

    if (!currentUser) {
      return false;
    }

    return allowedRoles.includes(currentUser.role);
  };

  const value = {
    currentUser,
    isAuthLoading,
    isAuthenticated: Boolean(currentUser),
    login,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}