
import React from 'react';

// Helper function to get customer name
export const getCustomerName = (id: string, customers: any[]) => {
  if (customers.length > 0) {
    const customer = customers.find(c => c.id === id);
    return customer ? customer.name : id;
  }
  return id;
};

// Get operator name (would be from an API in a real app)
export const getOperatorName = (id: string) => {
  const operators = [
    { id: "1", name: "Ahmad" },
    { id: "2", name: "John Smith" },
    { id: "3", name: "Emily Johnson" },
    { id: "4", name: "Michael Brown" },
  ];
  const op = operators.find(o => o.id === id);
  return op ? op.name : id;
};

// Get service type formatted name
export const getServiceTypeName = (type: string) => {
  switch (type) {
    case 'concrete-pumping': return 'Concrete Pumping';
    case 'line-pumping': return 'Line Pumping';
    case 'boom-lift': return 'Boom Lift';
    case 'material-delivery': return 'Material Delivery';
    default: return type;
  }
};
