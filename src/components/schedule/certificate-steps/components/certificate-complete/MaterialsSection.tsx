
import React from 'react';
import { Package, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MaterialsSectionProps {
  concreteType: string;
  quantity: string;
  onEditMaterials: () => void;
}

const MaterialsSection: React.FC<MaterialsSectionProps> = ({
  concreteType,
  quantity,
  onEditMaterials
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg flex items-center mt-4">
        <Package className="h-5 w-5 mr-2 text-blue-600" />
        Materials
      </h3>
      
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex items-start">
          <Package className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Concrete Type</p>
            <p className="font-medium">{concreteType || 'Not specified'}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Droplet className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="font-medium">{quantity || 'Not specified'}</p>
            <div className="flex items-center gap-1 mt-1">
              <Button 
                variant="outline" 
                size="xs" 
                className="h-7 px-2 py-1 text-xs"
                onClick={onEditMaterials}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsSection;
