
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotesSectionProps {
  notes: string;
  additionalNotes: string;
  onEditNotes: () => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  additionalNotes,
  onEditNotes
}) => {
  if (!notes && !additionalNotes) return null;
  
  return (
    <div className="mt-6">
      <h3 className="font-medium text-lg flex items-center">
        <FileText className="h-5 w-5 mr-2 text-blue-600" />
        Notes
      </h3>
      
      <div className="bg-gray-50 rounded-lg p-4 mt-2">
        {notes && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">General Notes</p>
            <p className="mt-1">{notes}</p>
          </div>
        )}
        
        {additionalNotes && (
          <div>
            <p className="text-sm text-gray-500">Additional Notes</p>
            <p className="mt-1">{additionalNotes}</p>
          </div>
        )}
        
        <div className="flex items-center gap-1 mt-3">
          <Button 
            variant="outline" 
            size="xs" 
            className="h-7 px-2 py-1 text-xs"
            onClick={onEditNotes}
          >
            Edit Notes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
