
import React from 'react';
import { Input } from '@/components/ui/input';
import { User, Phone, Mail } from 'lucide-react';
import FormGroup from '@/components/FormGroup';

interface ContactPersonStepProps {
  personFirstName: string;
  setPersonFirstName: (value: string) => void;
  personLastName: string;
  setPersonLastName: (value: string) => void;
  personEmail: string;
  setPersonEmail: (value: string) => void;
  personPhone: string;
  setPersonPhone: (value: string) => void;
}

const ContactPersonStep: React.FC<ContactPersonStepProps> = ({
  personFirstName,
  setPersonFirstName,
  personLastName,
  setPersonLastName,
  personEmail,
  setPersonEmail,
  personPhone,
  setPersonPhone
}) => {
  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <User className="h-5 w-5 text-blue-600 mr-2" />
        Contact Person Information
      </h2>
      <p className="text-gray-600 mb-4">
        Please enter the details of the primary contact person for this office.
      </p>
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup
            label="First Name"
            htmlFor="personFirstName"
            required
          >
            <div className="flex">
              <div className="flex-shrink-0 inline-flex items-center justify-center mr-2">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                id="personFirstName" 
                value={personFirstName} 
                onChange={(e) => setPersonFirstName(e.target.value)} 
                placeholder="Enter first name" 
              />
            </div>
          </FormGroup>
          
          <FormGroup
            label="Last Name"
            htmlFor="personLastName"
            required
          >
            <div className="flex">
              <div className="flex-shrink-0 inline-flex items-center justify-center mr-2">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                id="personLastName" 
                value={personLastName} 
                onChange={(e) => setPersonLastName(e.target.value)} 
                placeholder="Enter last name" 
              />
            </div>
          </FormGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup
            label="Email"
            htmlFor="personEmail"
            required
          >
            <div className="flex">
              <div className="flex-shrink-0 inline-flex items-center justify-center mr-2">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                id="personEmail" 
                type="email"
                value={personEmail} 
                onChange={(e) => setPersonEmail(e.target.value)} 
                placeholder="Enter email address" 
              />
            </div>
          </FormGroup>
          
          <FormGroup
            label="Phone Number"
            htmlFor="personPhone"
            required
          >
            <div className="flex">
              <div className="flex-shrink-0 inline-flex items-center justify-center mr-2">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                id="personPhone" 
                type="tel"
                value={personPhone} 
                onChange={(e) => setPersonPhone(e.target.value)} 
                placeholder="Enter phone number" 
              />
            </div>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default ContactPersonStep;
