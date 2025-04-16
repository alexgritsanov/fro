
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // We want to allow preview access without requiring authentication
    const allowAccess = 
      process.env.NODE_ENV === 'development' || 
      window.location.hostname.includes('lovable.app') ||
      window.location.hostname.includes('lovable.dev') ||
      window.location.hostname.includes('localhost') ||
      window.location.hostname.includes('127.0.0.1');
    
    // Only redirect to auth if authentication is required and user is not logged in
    if (!isLoading && !user && !allowAccess) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Always render children regardless of environment or auth state
  return <>{children}</>;
};

export default ProtectedRoute;
