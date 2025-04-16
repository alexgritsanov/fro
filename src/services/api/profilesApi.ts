
// API client for profile-related requests

export interface ProfileApiResponse {
  message: string;
  data: ProfileApiData[];
}

export interface ProfileApiData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  custom_fields: any;
  metadata: any;
  is_active: boolean;
  last_active: string;
  created_at: string;
  updated_at: string | null;
  company_id: string | null;
  phone_number: string | null;
  email: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  role: string;
  status: string;
  lastActive: string;
  phone: string | null;
  position: string | null;
  company_id: string | null;
  isContactPerson: boolean;
}

/**
 * Fetches all profiles from the API
 * @returns Promise with profile data
 */
export const getAllProfiles = async (): Promise<Profile[]> => {
  try {
    const response = await fetch('https://unidoc-server-c4649a0d7e27.herokuapp.com/api/profiles/get-all-profiles');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to fetch profiles');
    }
    
    const result: ProfileApiResponse = await response.json();
    
    // Map the API response data to match our Profile type
    const profiles: Profile[] = result.data.map(profile => ({
      id: profile.id,
      name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Unnamed User',
      email: profile.email || `user-${profile.id.substring(0, 8)}@example.com`,
      avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent((profile.first_name || '') + (profile.last_name ? ' ' + profile.last_name : '') || 'U')}`,
      role: capitalizeFirstLetter(profile.role || ''),
      status: profile.is_active ? 'active' : 'inactive',
      lastActive: profile.last_active || profile.created_at,
      phone: profile.phone_number,
      position: null, // No position in the current data structure
      company_id: profile.company_id,
      isContactPerson: false // No information about this in the current data structure
    }));
    
    return profiles;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

/**
 * Updates profile status
 * @param profileId Profile ID
 * @param status New status ('active' or 'inactive')
 */
export const updateProfileStatus = async (profileId: string, status: string) => {
  try {
    const isActive = status === 'active';
    
    // Update the endpoint to match the expected API
    const response = await fetch(`https://unidoc-server-c4649a0d7e27.herokuapp.com/api/profiles/update-status/${profileId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_active: isActive }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to update profile status');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating profile status:', error);
    throw error;
  }
};

/**
 * Helper function to capitalize the first letter of a string
 */
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
