
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-unidoc-extra-light p-4">
      <div className="text-center max-w-md w-full mx-auto">
        <div className="w-24 h-24 bg-unidoc-light-gray rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-unidoc-medium">404</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-unidoc-dark mb-4">Page not found</h1>
        <p className="text-unidoc-medium mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-unidoc-primary-blue text-white rounded-lg shadow-sm transition-all hover:bg-unidoc-primary-blue/90 active:scale-[0.98]"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-sm transition-all hover:bg-gray-300 active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
