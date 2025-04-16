
import React, { useState } from 'react';
import { User, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Avatar from '@/components/Avatar';

interface OperatorSelectionProps {
  operator: string;
  setOperator: (operator: string) => void;
  error?: string;
}

const OperatorSelection: React.FC<OperatorSelectionProps> = ({
  operator,
  setOperator,
  error
}) => {
  const [filter, setFilter] = useState<'all' | 'me' | 'employee' | 'subcontractor'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock operators data - this would come from an API in a real app
  const operators = [
    { id: "john-doe", name: "John Doe", type: "me" },
    { id: "jane-smith", name: "Jane Smith", type: "employee" },
    { id: "robert-johnson", name: "Robert Johnson", type: "employee" },
    { id: "emily-davis", name: "Emily Davis", type: "employee" },
    { id: "michael-brown", name: "Michael Brown", type: "subcontractor" },
    { id: "sarah-wilson", name: "Sarah Wilson", type: "subcontractor" }
  ];
  
  // Filter operators based on filter type and search term
  const filteredOperators = operators.filter(op => {
    const matchesFilter = filter === 'all' || op.type === filter;
    const matchesSearch = op.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium flex items-center">
          <User className="h-4 w-4 mr-1.5 text-blue-600" />
          Operator
        </label>
        
        <div className="flex flex-col space-y-3">
          {/* Filter buttons */}
          <div className="flex space-x-2">
            <Button 
              size="sm"
              variant={filter === 'all' ? 'default' : 'outline'} 
              onClick={() => setFilter('all')}
              className="text-xs"
            >
              All
            </Button>
            <Button 
              size="sm"
              variant={filter === 'me' ? 'default' : 'outline'} 
              onClick={() => setFilter('me')}
              className="text-xs"
            >
              Me
            </Button>
            <Button 
              size="sm"
              variant={filter === 'employee' ? 'default' : 'outline'} 
              onClick={() => setFilter('employee')}
              className="text-xs"
            >
              Employees
            </Button>
            <Button 
              size="sm"
              variant={filter === 'subcontractor' ? 'default' : 'outline'} 
              onClick={() => setFilter('subcontractor')}
              className="text-xs"
            >
              Subcontractors
            </Button>
          </div>
          
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search operators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Operators grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto p-1">
        {filteredOperators.map((op) => (
          <div
            key={op.id}
            onClick={() => setOperator(op.name)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all",
              operator === op.name 
                ? "bg-blue-50 border-blue-600" 
                : "bg-white border-gray-200 hover:border-blue-300"
            )}
          >
            <Avatar 
              alt={op.name} 
              size="sm" 
              className="mb-2" 
            />
            <span className="font-medium text-center text-sm">{op.name}</span>
            <span className="text-xs text-gray-500 mt-1">
              {op.type === 'me' ? 'Me' : op.type === 'employee' ? 'Employee' : 'Subcontractor'}
            </span>
          </div>
        ))}
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default OperatorSelection;
