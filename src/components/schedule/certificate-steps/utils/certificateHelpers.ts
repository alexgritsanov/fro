
export const getCustomerName = (customerId: string, customers: any[]) => {
  if (!customerId || !customers || !customers.length) return customerId || 'N/A';
  
  const customer = customers.find(c => c.id === customerId || c.id === Number(customerId));
  return customer ? customer.name : customerId;
};

export const getOperatorName = (operatorId: string) => {
  // This is a placeholder function to be replaced with actual data lookup
  // In a real app, you'd probably fetch this from API or context
  const operatorNames: { [key: string]: string } = {
    '1': 'John Smith',
    '2': 'Sarah Johnson',
    '3': 'Michael Davis',
    '4': 'David Wilson'
  };
  
  return operatorNames[operatorId] || operatorId || 'N/A';
};

export const getServiceTypeName = (serviceType: string) => {
  const serviceTypes: { [key: string]: string } = {
    'concrete-pumping': 'Concrete Pumping',
    'concrete-delivery': 'Concrete Delivery',
    'equipment-rental': 'Equipment Rental',
    'consultation': 'Consultation'
  };
  
  return serviceTypes[serviceType] || serviceType || 'N/A';
};
