import React, { createContext } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const value = {
    isAuthenticated: authService.isAuthenticated,
    getToken: authService.getToken,
    logout: authService.logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
