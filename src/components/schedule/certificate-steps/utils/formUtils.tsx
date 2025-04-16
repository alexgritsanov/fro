
import { CertificateFormData } from '../hooks/useCertificateStepProps';

/**
 * Updates a specific field in the form data by calling the appropriate setter function
 * @param field - The field to update
 * @param value - The new value for the field
 * @param setters - Object containing all setter functions
 */
export const updateFormData = (
  field: keyof CertificateFormData, 
  value: string | Date,
  setters: {
    setDate: (date: Date) => void;
    setServiceType: (type: string) => void;
    setCustomer: (customer: string) => void;
    setProjectSite: (site: string) => void;
    setHourlyBooking: React.Dispatch<React.SetStateAction<string>>;
    setPumpType: (type: string) => void;
    setQuantity: (quantity: string) => void;
    setVehicleNumber: (number: string) => void;
    setOperator: (operator: string) => void;
    setNotes: (notes: string) => void;
    setStartTime: (time: string) => void;
    setEndTime: (time: string) => void;
    setConcreteType: (type: string) => void;
    setCompanyProvides: (company: string) => void;
    setElementType: (type: string) => void;
    setWaitingTime: (time: string) => void;
    setWorkType: (type: string) => void;
    setTransfers: (transfers: string) => void;
    setAdditionalPipe: (pipe: string) => void;
    setMalkoTeam: (team: string) => void;
    setIncludeConcreteSupply: (include: string) => void;
    setAdditionalNotes: (notes: string) => void;
  }
) => {
  switch (field) {
    case 'date':
      setters.setDate(value as Date);
      break;
    case 'serviceType':
      setters.setServiceType(value as string);
      break;
    case 'customer':
      setters.setCustomer(value as string);
      break;
    case 'projectSite':
      setters.setProjectSite(value as string);
      break;
    case 'hourlyBooking':
      setters.setHourlyBooking(value as string);
      break;
    case 'pumpType':
      setters.setPumpType(value as string);
      break;
    case 'quantity':
      setters.setQuantity(value as string);
      break;
    case 'vehicleNumber':
      setters.setVehicleNumber(value as string);
      break;
    case 'operator':
      setters.setOperator(value as string);
      break;
    case 'notes':
      setters.setNotes(value as string);
      break;
    case 'startTime':
      setters.setStartTime(value as string);
      break;
    case 'endTime':
      setters.setEndTime(value as string);
      break;
    case 'concreteType':
      setters.setConcreteType(value as string);
      break;
    case 'companyProvides':
      setters.setCompanyProvides(value as string);
      break;
    case 'elementType':
      setters.setElementType(value as string);
      break;
    case 'waitingTime':
      setters.setWaitingTime(value as string);
      break;
    case 'workType':
      setters.setWorkType(value as string);
      break;
    case 'transfers':
      setters.setTransfers(value as string);
      break;
    case 'additionalPipe':
      setters.setAdditionalPipe(value as string);
      break;
    case 'malkoTeam':
      setters.setMalkoTeam(value as string);
      break;
    case 'includeConcreteSupply':
      setters.setIncludeConcreteSupply(value as string);
      break;
    case 'additionalNotes':
      setters.setAdditionalNotes(value as string);
      break;
  }
};
