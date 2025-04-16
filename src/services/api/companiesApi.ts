// API client for company-related requests

/**
 * Fetches all companies from the API
 * @returns Promise with company data
 */
export const getAllCompanies = async () => {
  try {
    const response = await fetch('https://unidoc-server-c4649a0d7e27.herokuapp.com/api/companies/get-all-companies');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to fetch companies');
    }
    
    const result = await response.json();
    // Map the API response data to match our Company type
    const companies = result.data.map(company => ({
      id: company.id,
      name: company.company_name,
      company_name: company.company_name,
      service_type: company.company_type,
      company_type: company.company_type,
      location: company.address,
      address: company.address,
      status: 'active', // Default status since it's not in the API response
      created_at: company.created_at,
      office_phone: company.office_phone,
      office_email: company.email,
      email: company.email,
      website: company.website,
      description: company.description,
      vat_number: company.vat_number,
      last_activity: company.created_at, // Using created_at as last_activity for now
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(company.company_name)}&background=random&color=fff`,
      user_limit: 100, // Default user limit
      // Default empty user counts
      users: {
        total: 0,
        employee: 0,
        foreman: 0,
        subcontractor: 0,
        customer: 0
      }
    }));
    
    return companies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

/**
 * Updates company status
 * @param companyId Company ID
 * @param status New status ('active' or 'inactive')
 */
export const updateCompanyStatus = async (companyId: string, status: string) => {
  try {
    const response = await fetch(`https://unidoc-server-c4649a0d7e27.herokuapp.com/api/companies/update-status/${companyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to update company status');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating company status:', error);
    throw error;
  }
};

/**
 * Deletes a company
 * @param companyId Company ID
 */
export const deleteCompany = async (companyId: string) => {
  try {
    const response = await fetch(`https://unidoc-server-c4649a0d7e27.herokuapp.com/api/companies/delete-company/${companyId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to delete company');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting company:', error);
    throw error;
  }
};
