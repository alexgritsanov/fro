
import React from 'react';

interface FormGroupProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  helperText?: string;
  error?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  htmlFor,
  required = false,
  className = '',
  children,
  helperText,
  error
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {helperText && !error && (
        <p className="text-sm text-gray-500 mt-1">{helperText}</p>
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormGroup;
