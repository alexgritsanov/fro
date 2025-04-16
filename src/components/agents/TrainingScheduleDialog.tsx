import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin, 
  Clipboard,
  Check,
  User,
  Search
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

interface TrainingScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrainingScheduleDialog: React.FC<TrainingScheduleDialogProps> = ({
  isOpen,
  onClose
}) => {
  const [trainingTitle, setTrainingTitle] = useState('');
  const [trainingType, setTrainingType] = useState('');
  const [trainingDate, setTrainingDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [locationType, setLocationType] = useState('in-person');
  const [description, setDescription] = useState('');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  
  const handleScheduleTraining = () => {
    if (!trainingTitle || !trainingType || !trainingDate || !startTime || !location) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Training scheduled successfully');
    onClose();
  };
  
  const handleAgentSelection = (agentId: string) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    } else {
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };
  
  const filteredAgents = [
    { id: 'a1', name: 'David Cohen', region: 'Tel Aviv', trainingStatus: 'Incomplete' },
    { id: 'a2', name: 'Sarah Miller', region: 'Jerusalem', trainingStatus: 'Complete' },
    { id: 'a3', name: 'Michael Ben', region: 'Haifa', trainingStatus: 'Incomplete' },
    { id: 'a4', name: 'Rachel Green', region: 'Tel Aviv', trainingStatus: 'Incomplete' },
    { id: 'a5', name: 'Daniel Levy', region: 'Beer Sheva', trainingStatus: 'Partial' }
  ].filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.region.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-blue-600" />
            Schedule Training
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-md mb-4">
              <TabsTrigger value="details" className="flex-1">
                Training Details
              </TabsTrigger>
              <TabsTrigger value="participants" className="flex-1">
                Participants
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="training-title">Training Title *</Label>
                  <Input 
                    id="training-title" 
                    placeholder="Enter training title"
                    value={trainingTitle}
                    onChange={(e) => setTrainingTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="training-type">Training Type *</Label>
                  <Select value={trainingType} onValueChange={setTrainingType}>
                    <SelectTrigger id="training-type">
                      <SelectValue placeholder="Select training type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                      <SelectItem value="product">Product Knowledge</SelectItem>
                      <SelectItem value="sales">Sales Techniques</SelectItem>
                      <SelectItem value="compliance">Legal & Compliance</SelectItem>
                      <SelectItem value="customer-service">Customer Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="training-date">Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        id="training-date"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {trainingDate ? format(trainingDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <div className="p-2">
                        <p className="text-sm text-center p-4">Calendar placeholder</p>
                        <div className="flex justify-around p-2">
                          <Button 
                            size="sm" 
                            onClick={() => setTrainingDate(new Date())}
                          >
                            Today
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setTrainingDate(undefined)}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time *</Label>
                    <Input 
                      id="start-time" 
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input 
                      id="end-time" 
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-base">Location Type *</Label>
                  <RadioGroup 
                    value={locationType} 
                    onValueChange={setLocationType}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-person" id="in-person" />
                      <label 
                        htmlFor="in-person" 
                        className="text-sm font-medium cursor-pointer"
                      >
                        In-Person
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="virtual" id="virtual" />
                      <label 
                        htmlFor="virtual" 
                        className="text-sm font-medium cursor-pointer"
                      >
                        Virtual
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <label 
                        htmlFor="hybrid" 
                        className="text-sm font-medium cursor-pointer"
                      >
                        Hybrid
                      </label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location Details *</Label>
                  <Input 
                    id="location" 
                    placeholder={locationType === 'virtual' ? "Enter meeting link or platform" : "Enter address"}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description & Agenda</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter training description and agenda"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="send-notification" defaultChecked />
                    <label 
                      htmlFor="send-notification" 
                      className="text-sm font-medium cursor-pointer"
                    >
                      Send notification to participants when scheduled
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="add-calendar" defaultChecked />
                    <label 
                      htmlFor="add-calendar" 
                      className="text-sm font-medium cursor-pointer"
                    >
                      Add to company calendar
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="track-completion" defaultChecked />
                    <label 
                      htmlFor="track-completion" 
                      className="text-sm font-medium cursor-pointer"
                    >
                      Track training completion
                    </label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="participants" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center">
                  <Users className="h-4 w-4 text-blue-600 mr-2" />
                  Select Participants
                </h3>
                <div className="text-sm text-gray-500">
                  {selectedAgents.length} agents selected
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search agents by name or region..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="select-all"
                      checked={selectedAgents.length === filteredAgents.length && filteredAgents.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedAgents(filteredAgents.map(agent => agent.id));
                        } else {
                          setSelectedAgents([]);
                        }
                      }}
                    />
                    <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                      Select All
                    </label>
                  </div>
                  
                  {selectedAgents.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedAgents([])}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      Clear Selection
                    </Button>
                  )}
                </div>
                
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredAgents.length > 0 ? (
                    <div className="divide-y">
                      {filteredAgents.map((agent) => (
                        <div key={agent.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <Checkbox 
                              id={`agent-${agent.id}`}
                              checked={selectedAgents.includes(agent.id)}
                              onCheckedChange={() => handleAgentSelection(agent.id)}
                            />
                            <label 
                              htmlFor={`agent-${agent.id}`} 
                              className="flex-1 flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium">{agent.name}</div>
                                  <div className="text-sm text-gray-500">{agent.region} Region</div>
                                </div>
                              </div>
                              <div className={`text-sm px-2 py-1 rounded ${
                                agent.trainingStatus === 'Complete' ? 'bg-green-100 text-green-800' :
                                agent.trainingStatus === 'Partial' ? 'bg-amber-100 text-amber-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {agent.trainingStatus}
                              </div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <h3 className="font-medium mb-1">No agents found</h3>
                      <p className="text-sm text-gray-500">
                        Try adjusting your search term
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 p-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Complete</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span>Partial</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Incomplete</span>
                  </div>
                </div>
                
                <div>
                  Training status shown for this training type
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium flex items-center mb-2">
                  <Clipboard className="h-4 w-4 text-blue-600 mr-2" />
                  Training Completion Tracking
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  The system will automatically track training completion for selected participants. 
                  You can update completion status manually after the training.
                </p>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="assessment" />
                  <label 
                    htmlFor="assessment" 
                    className="text-sm font-medium cursor-pointer"
                  >
                    Require assessment completion for certification
                  </label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleScheduleTraining}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Schedule Training
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrainingScheduleDialog;
