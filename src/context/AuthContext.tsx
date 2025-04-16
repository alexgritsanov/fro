
import React, { createContext, useState, useEffect, useContext } from 'react';

interface User {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  phone: string;
  position: string;
  role: string;
}

interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  company_id: string;
  phone: string;
  position: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, companyId: string, fullName: string) => Promise<void>;
  signOut: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser = {
  id: '123',
  full_name: 'Admin User',
  email: 'admin@example.com',
  avatar_url: 'https://i.pravatar.cc/150?img=3',
  company_id: '1',
  created_at: '2023-01-01T00:00:00.000Z',
  updated_at: '2023-01-01T00:00:00.000Z',
  phone: '+1234567890',
  position: 'Admin',
  role: 'admin'
};

// Mock profile data (derived from user)
const mockProfile = {
  id: mockUser.id,
  full_name: mockUser.full_name,
  email: mockUser.email,
  avatar_url: mockUser.avatar_url,
  company_id: mockUser.company_id,
  phone: mockUser.phone,
  position: mockUser.position,
  role: mockUser.role
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Get user from local storage on initial load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : mockUser;
  });
  
  const [profile, setProfile] = useState<Profile | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return {
        id: parsedUser.id,
        full_name: parsedUser.full_name,
        email: parsedUser.email,
        avatar_url: parsedUser.avatar_url,
        company_id: parsedUser.company_id,
        phone: parsedUser.phone,
        position: parsedUser.position,
        role: parsedUser.role
      };
    }
    return mockProfile;
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    // Set user in local storage when it changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Auth methods
  const login = (user: User) => {
    setUser(user);
    setProfile({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      avatar_url: user.avatar_url,
      company_id: user.company_id,
      phone: user.phone,
      position: user.position,
      role: user.role
    });
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
  };

  // Mock sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      login(mockUser);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock sign up function
  const signUp = async (email: string, password: string, companyId: string, fullName: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newUser = {
        ...mockUser,
        email,
        full_name: fullName,
        company_id: companyId,
      };
      login(newUser);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock sign out function
  const signOut = () => {
    logout();
  };

  // Mock reset password function
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Password reset link sent to ${email}`);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock update profile function
  const updateProfile = async (profileUpdates: Partial<Profile>) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (profile) {
        const updatedProfile = { ...profile, ...profileUpdates };
        setProfile(updatedProfile);
        
        if (user) {
          const updatedUser = { 
            ...user,
            full_name: updatedProfile.full_name,
            email: updatedProfile.email,
            avatar_url: updatedProfile.avatar_url,
            phone: updatedProfile.phone,
            position: updatedProfile.position
          };
          setUser(updatedUser);
        }
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
    profile,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
