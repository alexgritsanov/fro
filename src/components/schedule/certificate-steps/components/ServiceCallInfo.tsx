
import React from 'react';

interface ServiceCallInfoProps {
  serviceCall: any;
}

const ServiceCallInfo: React.FC<ServiceCallInfoProps> = ({ serviceCall }) => {
  if (!serviceCall) return null;
  
  return (
    <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-blue-700 text-sm">
        <span className="font-medium">Information from service call:</span> Some values have been pre-filled based on the service call data.
      </p>
    </div>
  );
};

export default ServiceCallInfo;
