import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../features/auth/context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const useAuthGuard = (navigate) => {
  const [isChecking, setIsChecking] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
    setIsChecking(false);
  }, [isAuthenticated, navigate]);

  return isChecking;
};
