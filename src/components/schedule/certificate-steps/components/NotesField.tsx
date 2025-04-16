
import React from 'react';
import { FileText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface NotesFieldProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const NotesField: React.FC<NotesFieldProps> = ({
  notes,
  setNotes
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <FileText className="h-4 w-4 mr-1.5 text-blue-600" />
        Notes
      </label>
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter any additional notes here..."
        className="min-h-[100px] border-gray-200 bg-white"
      />
    </div>
  );
};

export default NotesField;
