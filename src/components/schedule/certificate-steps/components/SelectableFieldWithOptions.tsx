
import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash, Check, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface SelectableFieldWithOptionsProps {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  setOptions: (options: string[]) => void;
  label: string;
  icon: React.ReactNode;
  placeholder?: string;
}

const SelectableFieldWithOptions: React.FC<SelectableFieldWithOptionsProps> = ({
  value,
  setValue,
  options,
  setOptions,
  label,
  icon,
  placeholder = 'Search...'
}) => {
  const [search, setSearch] = useState('');
  const [newOption, setNewOption] = useState('');
  const [editOptionId, setEditOptionId] = useState<string | null>(null);
  const [editOptionValue, setEditOptionValue] = useState('');

  // Filter options based on search
  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddOption = () => {
    if (newOption.trim()) {
      const newOptions = [...options, newOption.trim()];
      setOptions(newOptions);
      setValue(newOption.trim());
      setNewOption('');
      toast.success(`New ${label.toLowerCase()} added`, {
        description: `${newOption} has been added.`,
      });
    }
  };

  const handleSelectOption = (option: string) => {
    setValue(option);
  };
  
  const handleEditOption = (option: string) => {
    setEditOptionId(option);
    setEditOptionValue(option);
  };
  
  const handleSaveOptionEdit = () => {
    if (editOptionValue.trim() && editOptionId) {
      const oldOption = editOptionId;
      setOptions(options.map(option => 
        option === oldOption ? editOptionValue.trim() : option
      ));
      
      if (value === oldOption) {
        setValue(editOptionValue.trim());
      }
      
      setEditOptionId(null);
      setEditOptionValue('');
      
      toast.success(`${label} updated`, {
        description: `${oldOption} has been renamed to ${editOptionValue}.`,
      });
    }
  };
  
  const handleCancelOptionEdit = () => {
    setEditOptionId(null);
    setEditOptionValue('');
  };
  
  const handleDeleteOption = (option: string) => {
    setOptions(options.filter(o => o !== option));
    
    if (value === option) {
      setValue('');
    }
    
    toast.success(`${label} removed`, {
      description: `${option} has been removed.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-base font-medium flex items-center">
          {icon}
          <span className="ml-2">{label}</span>
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-[180px] h-9 rounded-full border-gray-300 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Input
          placeholder={`Add new ${label.toLowerCase()}...`}
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          className="h-10 rounded-l-full rounded-r-none border-gray-300 focus:border-blue-500"
        />
        <Button 
          onClick={handleAddOption}
          disabled={!newOption.trim()}
          className="rounded-l-none rounded-r-full bg-gradient-to-r from-blue-500 to-blue-600 text-white h-10 px-4"
        >
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
      
      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <div 
              key={option}
              className={`flex justify-between items-center p-3 border rounded-xl transition-all ${
                value === option 
                  ? 'border-blue-500 bg-blue-50 shadow-sm' 
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
              }`}
              onClick={() => handleSelectOption(option)}
            >
              {editOptionId === option ? (
                <div className="flex items-center w-full gap-2">
                  <Input 
                    value={editOptionValue} 
                    onChange={(e) => setEditOptionValue(e.target.value)} 
                    className="flex-1 h-9"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Button 
                    size="sm"
                    className="h-9 bg-green-500 hover:bg-green-600 px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveOptionEdit();
                    }}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-9 px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelOptionEdit();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <span className="text-base">{option}</span>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 rounded-full hover:bg-blue-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditOption(option);
                      }}
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 rounded-full hover:bg-red-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOption(option);
                      }}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            {search 
              ? `No ${label.toLowerCase()}s match your search.` 
              : `No ${label.toLowerCase()}s added yet. Add a new one above.`}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectableFieldWithOptions;
