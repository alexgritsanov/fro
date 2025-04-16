
export interface OfficeFormData {
  name: string;
  service_type: string;
  location: string;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  vat_number?: string;
  company_name?: string;
  address?: string;
  
  // Admin contact details
  admin_name?: string;
  admin_email?: string;
  admin_phone?: string;
  
  // User limits
  user_limits?: {
    employee?: number;
    foreman?: number;
    subcontractor?: number;
    customer?: number;
  };
  
  // This property is used for the API payload
  company_data?: any;
  
  // Additional properties needed for CreateOfficeModal and ReviewStep
  companyType?: string;
  companyName?: string;
  companyId?: string;
  officeAddress?: string;
  officePhone?: string;
  officeEmail?: string;
  profile_data?: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
  selectedPlan?: string;
  customLimits?: {
    total: number;
    employee: number;
    foreman: number;
    subcontractor: number;
    client: number;
  };
  selectedAdmin?: string;
}

// Additional types needed for data.tsx
export interface CompanyType {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

export interface Plan {
  name: string;
  value: string;
  price: string;
  description: string;
  features: string[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}
