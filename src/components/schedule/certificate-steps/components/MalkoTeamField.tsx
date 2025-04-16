
import React from 'react';
import { Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MalkoTeamFieldProps {
  malkoTeam: string;
  setMalkoTeam: (team: string) => void;
}

const MalkoTeamField: React.FC<MalkoTeamFieldProps> = ({
  malkoTeam,
  setMalkoTeam
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <Users className="h-4 w-4 mr-1.5 text-blue-600" />
        Malko Team
      </label>
      <Select value={malkoTeam} onValueChange={setMalkoTeam}>
        <SelectTrigger className="border-gray-200 bg-white">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yes">Yes</SelectItem>
          <SelectItem value="no">No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MalkoTeamField;
