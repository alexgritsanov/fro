
import { CertificateFormData } from '../hooks/useCertificateStepProps';

interface FormSetters {
  setDate: (date: Date) => void;
  setServiceType: (type: string) => void;
  setCustomer: (customer: string) => void;
  setProjectSite: (site: string) => void;
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
  setHourlyBooking: (time: string) => void;
}

export const updateFormData = (
  field: keyof CertificateFormData, 
  value: string | Date, 
  setters: FormSetters
) => {
  switch (field) {
    case 'date':
      if (value instanceof Date) {
        setters.setDate(value);
      }
      break;
    case 'serviceType':
      if (typeof value === 'string') {
        setters.setServiceType(value);
      }
      break;
    case 'customer':
      if (typeof value === 'string') {
        setters.setCustomer(value);
      }
      break;
    case 'projectSite':
      if (typeof value === 'string') {
        setters.setProjectSite(value);
      }
      break;
    case 'pumpType':
      if (typeof value === 'string') {
        setters.setPumpType(value);
      }
      break;
    case 'quantity':
      if (typeof value === 'string') {
        setters.setQuantity(value);
      }
      break;
    case 'vehicleNumber':
      if (typeof value === 'string') {
        setters.setVehicleNumber(value);
      }
      break;
    case 'operator':
      if (typeof value === 'string') {
        setters.setOperator(value);
      }
      break;
    case 'notes':
      if (typeof value === 'string') {
        setters.setNotes(value);
      }
      break;
    case 'startTime':
      if (typeof value === 'string') {
        setters.setStartTime(value);
      }
      break;
    case 'endTime':
      if (typeof value === 'string') {
        setters.setEndTime(value);
      }
      break;
    case 'concreteType':
      if (typeof value === 'string') {
        setters.setConcreteType(value);
      }
      break;
    case 'companyProvides':
      if (typeof value === 'string') {
        setters.setCompanyProvides(value);
      }
      break;
    case 'elementType':
      if (typeof value === 'string') {
        setters.setElementType(value);
      }
      break;
    case 'waitingTime':
      if (typeof value === 'string') {
        setters.setWaitingTime(value);
      }
      break;
    case 'workType':
      if (typeof value === 'string') {
        setters.setWorkType(value);
      }
      break;
    case 'transfers':
      if (typeof value === 'string') {
        setters.setTransfers(value);
      }
      break;
    case 'additionalPipe':
      if (typeof value === 'string') {
        setters.setAdditionalPipe(value);
      }
      break;
    case 'malkoTeam':
      if (typeof value === 'string') {
        setters.setMalkoTeam(value);
      }
      break;
    case 'includeConcreteSupply':
      if (typeof value === 'string') {
        setters.setIncludeConcreteSupply(value);
      }
      break;
    case 'additionalNotes':
      if (typeof value === 'string') {
        setters.setAdditionalNotes(value);
      }
      break;
    case 'hourlyBooking':
      if (typeof value === 'string') {
        setters.setHourlyBooking(value);
      }
      break;
    default:
      console.warn(`Unknown field: ${field}`);
  }
};
