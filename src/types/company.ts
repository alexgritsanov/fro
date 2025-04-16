
export interface Company {
  id: string;
  name: string;
  logo?: string;
  service_type?: string;
  location?: string;
  user_limit?: number;
  status: string;
  created_at: string;
  updated_at?: string;
  office_phone?: string;
  office_email?: string;
  address?: string;
  company_id?: string;
  company_type?: string;
  company_name?: string;
  description?: string;
  website?: string;
  email?: string;
  vat_number?: string;
  last_activity?: string;
  users?: {
    total?: number;
    employee?: number;
    foreman?: number;
    subcontractor?: number;
    customer?: number;
  };
}
