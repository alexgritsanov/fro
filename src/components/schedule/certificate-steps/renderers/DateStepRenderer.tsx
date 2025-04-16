
import React from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { containerVariants, errorShake } from '../../serviceInfoUtils';
import { format } from 'date-fns';
import { DatePicker } from '@/components/ui/date-picker';

export const DateStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  moveToNextStep,
  moveToPrevStep,
  errorShakeAnimate
}) => {
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 6; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const hourNum = hour;
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        const displayHour = hourNum % 12 || 12;
        const displayTime = `${displayHour}:${formattedMinute} ${ampm}`;
        options.push({
          value: `${formattedHour}:${formattedMinute}`,
          display: displayTime
        });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();
  
  return (
    <motion.div 
      variants={errorShakeAnimate ? errorShake : containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold">Schedule Service</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <p className="font-medium mb-3 text-gray-700 text-lg">
            {formData.date ? format(formData.date, 'MMMM d, yyyy') : 'Select a date'}
          </p>
          <div className="border border-gray-200 rounded-lg bg-white">
            <DatePicker 
              date={formData.date} 
              onSelect={(date) => updateFormData('date', date || new Date())}
              showCalendarByDefault={true}
            />
          </div>
        </div>
        
        <div className="flex flex-col">
          <p className="font-medium mb-3 text-gray-700 text-lg">Select Time</p>
          <div className="border border-gray-200 rounded-lg h-[280px] overflow-hidden">
            <div className="h-full overflow-y-auto p-2 grid grid-cols-2 gap-2">
              {timeOptions.map((time) => (
                <Button
                  key={time.value}
                  variant={time.value === formData.startTime ? "default" : "outline"}
                  size="sm"
                  className={`
                    justify-start py-3 px-3 text-left rounded-md transition-colors text-sm
                    ${time.value === formData.startTime ? "bg-blue-600" : "hover:bg-blue-50"}
                  `}
                  onClick={() => updateFormData('startTime', time.value)}
                >
                  <Clock className="h-4 w-4 mr-2 opacity-70" />
                  {time.display}
                  {time.value === formData.startTime && (
                    <Check className="h-4 w-4 ml-auto" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="text-lg h-12 px-8 rounded-full"
        >
          Back
        </Button>
        
        <Button 
          onClick={moveToNextStep}
          disabled={!formData.date || !formData.startTime}
          className="text-lg h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center"
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};
