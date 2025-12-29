
import React from 'react';
/* Direct named imports to avoid type issues with wildcard import */
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // Security Check: In a real app, this would verify a JWT token with a backend.
  // For this prototype, we check the session storage.
  const isAuthenticated = sessionStorage.getItem('sm_skills_auth') === 'true';

  if (!isAuthenticated) {
    // Redirect to login but save the attempted location so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
