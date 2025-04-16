
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TemplateProps {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  type: string;
}

interface TemplateGalleryProps {
  documentType: string;
  onTemplateSelect: (template: TemplateProps) => void;
}

const TemplateGallery = ({ documentType, onTemplateSelect }: TemplateGalleryProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [templateType, setTemplateType] = React.useState('all');
  
  // Mock templates - in a real app, these would come from an API
  const templates: TemplateProps[] = [
    {
      id: 'sc-template-1',
      name: 'Standard Service Call',
      imageUrl: 'https://via.placeholder.com/300x400?text=Service+Call+Template+1',
      description: 'Basic service call template with all required fields',
      type: 'service-call'
    },
    {
      id: 'sc-template-2',
      name: 'Premium Service Call',
      imageUrl: 'https://via.placeholder.com/300x400?text=Service+Call+Template+2',
      description: 'Enhanced service call template with company branding',
      type: 'service-call'
    },
    {
      id: 'sc-template-3',
      name: 'Detailed Service Call',
      imageUrl: 'https://via.placeholder.com/300x400?text=Service+Call+Template+3',
      description: 'Comprehensive service call template with additional fields',
      type: 'service-call'
    },
    {
      id: 'dc-template-1',
      name: 'Standard Delivery Certificate',
      imageUrl: 'https://via.placeholder.com/300x400?text=Delivery+Certificate+1',
      description: 'Basic delivery certificate template with signature field',
      type: 'delivery-certificate'
    },
    {
      id: 'dc-template-2',
      name: 'Detailed Delivery Certificate',
      imageUrl: 'https://via.placeholder.com/300x400?text=Delivery+Certificate+2',
      description: 'Comprehensive delivery certificate with material tracking',
      type: 'delivery-certificate'
    },
    {
      id: 'rp-template-1',
      name: 'Monthly Summary Report',
      imageUrl: 'https://via.placeholder.com/300x400?text=Monthly+Report',
      description: 'Standard monthly activity summary with charts',
      type: 'report'
    },
    {
      id: 'rp-template-2',
      name: 'Customer Activity Report',
      imageUrl: 'https://via.placeholder.com/300x400?text=Customer+Report',
      description: 'Detailed customer activity tracking with metrics',
      type: 'customer-report'
    },
    {
      id: 'rp-template-3',
      name: 'Employee Performance',
      imageUrl: 'https://via.placeholder.com/300x400?text=Employee+Report',
      description: 'Employee performance analysis with benchmarks',
      type: 'employee-report'
    }
  ];
  
  // Filter templates based on document type and search term
  const filteredTemplates = templates.filter(template => {
    const matchesType = documentType === 'all' || template.type === documentType;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Template Gallery</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search templates"
            className="pl-8 h-9 md:w-[200px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[calc(100vh-300px)] overflow-y-auto p-2">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer border-2 hover:border-blue-500">
              <div className="h-40 overflow-hidden" onClick={() => onTemplateSelect(template)}>
                <img
                  src={template.imageUrl}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                <p className="text-xs text-gray-500">{template.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => onTemplateSelect(template)}
                >
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-8 text-center">
            <p className="text-gray-500 mb-2">No templates found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or creating a custom template</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateGallery;
