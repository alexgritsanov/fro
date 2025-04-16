
import React from 'react';
import { motion } from 'framer-motion';
import { Info, Clock, Truck, Droplet, FileText, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { containerVariants } from '../serviceInfoUtils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AdditionalInfoStepProps {
  waitingTime: string;
  setWaitingTime: (time: string) => void;
  workType: string;
  setWorkType: (type: string) => void;
  transfers: string;
  setTransfers: (transfers: string) => void;
  additionalPipe: string;
  setAdditionalPipe: (pipe: string) => void;
  malkoTeam: string;
  setMalkoTeam: (team: string) => void;
  includeConcreteSupply: string;
  setIncludeConcreteSupply: (include: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  additionalNotes: string;
  setAdditionalNotes: (notes: string) => void;
  moveToNextStep: () => void;
  moveToPrevStep: () => void;
}

const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({
  waitingTime,
  setWaitingTime,
  workType,
  setWorkType,
  transfers,
  setTransfers,
  additionalPipe,
  setAdditionalPipe,
  malkoTeam,
  setMalkoTeam,
  includeConcreteSupply,
  setIncludeConcreteSupply,
  notes,
  setNotes,
  additionalNotes,
  setAdditionalNotes,
  moveToNextStep,
  moveToPrevStep
}) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-4 md:p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-6">
        <Info className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-xl md:text-2xl font-bold">Additional Information</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Clock className="h-4 w-4 mr-1.5 text-blue-600" />
            Waiting Time (Hours)
          </label>
          <Input 
            type="number" 
            min="0"
            value={waitingTime} 
            onChange={(e) => setWaitingTime(e.target.value)} 
            className="border-gray-200 bg-white"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <FileText className="h-4 w-4 mr-1.5 text-blue-600" />
            Work Type
          </label>
          <Select value={workType} onValueChange={setWorkType}>
            <SelectTrigger className="border-gray-200 bg-white">
              <SelectValue placeholder="Select work type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full Day">Full Day</SelectItem>
              <SelectItem value="Half Day">Half Day</SelectItem>
              <SelectItem value="Hourly">Hourly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Truck className="h-4 w-4 mr-1.5 text-blue-600" />
            Transfers on Site
          </label>
          <Select value={transfers} onValueChange={setTransfers}>
            <SelectTrigger className="border-gray-200 bg-white">
              <SelectValue placeholder="Select number of transfers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <FileText className="h-4 w-4 mr-1.5 text-blue-600" />
            Additional Pipe (Meter)
          </label>
          <Input 
            type="number" 
            min="0"
            value={additionalPipe} 
            onChange={(e) => setAdditionalPipe(e.target.value)} 
            className="border-gray-200 bg-white"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <User className="h-4 w-4 mr-1.5 text-blue-600" />
            Malko Team
          </label>
          <RadioGroup value={malkoTeam} onValueChange={setMalkoTeam} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="malko-yes" />
              <Label htmlFor="malko-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="malko-no" />
              <Label htmlFor="malko-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Droplet className="h-4 w-4 mr-1.5 text-blue-600" />
            Include concrete supply
          </label>
          <RadioGroup value={includeConcreteSupply} onValueChange={setIncludeConcreteSupply} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="supply-yes" />
              <Label htmlFor="supply-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="supply-no" />
              <Label htmlFor="supply-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mt-6">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <FileText className="h-4 w-4 mr-1.5 text-blue-600" />
            Notes
          </label>
          <Textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="Enter any notes..."
            rows={3}
            className="border-gray-200 bg-white min-h-[60px]"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <FileText className="h-4 w-4 mr-1.5 text-blue-600" />
            Additional Notes
          </label>
          <Textarea 
            value={additionalNotes} 
            onChange={(e) => setAdditionalNotes(e.target.value)} 
            placeholder="Enter any additional notes..."
            rows={3}
            className="border-gray-200 bg-white min-h-[60px]"
          />
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 p-3 rounded-md flex items-start mt-6">
        <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-blue-800">
            All service additions will be included in the delivery certificate and may affect pricing.
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Customer signature will be required to confirm these additions.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="border-gray-200 bg-white flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Button 
          onClick={moveToNextStep}
          className="flex items-center"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default AdditionalInfoStep;
