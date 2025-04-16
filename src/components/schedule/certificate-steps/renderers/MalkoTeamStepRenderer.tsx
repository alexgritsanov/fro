
import React, { useState, useEffect } from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import { motion } from 'framer-motion';
import { Users, ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { containerVariants, errorShake } from '../../serviceInfoUtils';
import YesNoSelectionWithApproval from '../components/YesNoSelectionWithApproval';
import { toast } from 'sonner';

export const MalkoTeamStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  moveToNextStep,
  moveToPrevStep,
  errorShakeAnimate
}) => {
  const [malkoTeamValue, setMalkoTeamValue] = useState(formData.malkoTeam || '');

  // Update local state when form data changes
  useEffect(() => {
    if (formData.malkoTeam !== malkoTeamValue && formData.malkoTeam) {
      setMalkoTeamValue(formData.malkoTeam);
    }
  }, [formData.malkoTeam]);

  const handleSetMalkoTeam = (value: string) => {
    setMalkoTeamValue(value);
    updateFormData('malkoTeam', value);

    toast.success(`Malko Team selection approved`, {
      description: `${value.toUpperCase()} has been confirmed.`,
    });
  };
  
  const canContinue = !!malkoTeamValue;

  return (
    <motion.div 
      variants={errorShakeAnimate ? errorShake : containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold">Malko Team</h2>
      </div>
      
      <div className="mb-6 max-w-md mx-auto">
        <YesNoSelectionWithApproval 
          value={malkoTeamValue}
          setValue={handleSetMalkoTeam}
          label="Include Malko Team"
          reverseOrder={true} // This makes "NO" appear before "YES"
          requireApprovalForYes={true} // Require approval for YES option
          defaultValue="no" // Default to NO
        />
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          type="button"
          variant="outline" 
          onClick={moveToPrevStep} 
          className="text-lg h-12 px-8 rounded-full border-gray-300 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        
        <Button 
          type="button"
          onClick={moveToNextStep}
          className="text-lg h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center shadow-md hover:shadow-lg transition-all"
          disabled={!canContinue}
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};
