
// API client for customer-related requests

export interface CustomerApiResponse {
  message: string;
  data: CustomerApiData[];
}

export interface CustomerApiData {
  id: string;
  company_name: string;
  description: string | null;
  address: string;
  website: string | null;
  email: string;
  office_phone: string;
  created_at: string;
  company_type: string;
  vat_number: string;
}

export interface Customer {
  id: string;
  name: string;
  nickname: string | null;
  email: string;
  phone: string;
  officePhone: string;
  address: string;
  address2: string | null;
  type: string;
  status: string;
  created_at: string;
  updated_at: string | null;
  avatar_url: string;
  needs_quote: boolean;
  customerId: string;
  contactName: string | null;
  favorite?: boolean;
  last_active?: string;
  website: string | null;
  description: string | null;
  vat_number: string;
}

/**
 * Fetches all customers from the API
 * @returns Promise with customer data
 */
export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch('https://unidoc-server-c4649a0d7e27.herokuapp.com/api/companies/get-all-customers');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to fetch customers');
    }
    
    const result: CustomerApiResponse = await response.json();
    
    // Map the API response data to match our Customer type
    const customers: Customer[] = result.data.map(company => ({
      id: company.id,
      name: company.company_name,
      nickname: null,
      email: company.email || '',
      phone: company.office_phone || '',
      officePhone: company.office_phone || '',
      address: company.address || '',
      address2: null,
      type: company.company_type,
      status: 'active', // Default status
      created_at: company.created_at,
      updated_at: null,
      avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(company.company_name)}&background=random&color=fff`,
      needs_quote: Math.random() > 0.7, // Randomize for demo
      customerId: company.id.substring(0, 8),
      contactName: null,
      website: company.website,
      description: company.description,
      vat_number: company.vat_number,
      last_active: company.created_at
    }));
    
    return customers;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

/**
 * Updates customer status
 * @param customerId Customer ID
 * @param status New status ('active' or 'inactive')
 */
export const updateCustomerStatus = async (customerId: string, status: string) => {
  try {
    // This is a placeholder API endpoint, update as needed
    const response = await fetch(`https://unidoc-server-c4649a0d7e27.herokuapp.com/api/companies/update-status/${customerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to update customer status');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating customer status:', error);
    throw error;
  }
};

/**
 * Deletes a customer
 * @param customerId Customer ID
 */
export const deleteCustomer = async (customerId: string) => {
  try {
    // This is a placeholder API endpoint, update as needed
    const response = await fetch(`https://unidoc-server-c4649a0d7e27.herokuapp.com/api/companies/delete-company/${customerId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to delete customer');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};
