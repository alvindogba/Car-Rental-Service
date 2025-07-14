import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'renter' | 'owner'; // Optional role requirement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const location = useLocation();
  const { token, user } = useSelector((state: RootState) => state.auth);
  
  // Check if user is authenticated
  const isAuthenticated = !!token;
  
  // Check if user has required role (if specified)
  const hasRequiredRole = requiredRole ? user.role === requiredRole : true;

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (!hasRequiredRole) {
    // Redirect to home page if authenticated but wrong role
    return <Navigate to="/" state={{ 
      from: location,
      message: `Access denied. This area is for ${requiredRole}s only.` 
    }} replace />;
  }

  // If authenticated and has required role, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
