import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../features/auth/services/authService';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  if (!authService.isAuthenticated()) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
