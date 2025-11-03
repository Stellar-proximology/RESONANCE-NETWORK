import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/apiService';

interface User {
  id: string;
  email: string;
  provider: string;
  created_at: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  birth_date: string;
  birth_time: string;
  birth_location: string;
  current_state: string;
  challenge: string;
  dream: string;
  skills: string[];
  needs: string[];
  availability: Record<string, string>;
  natal_gates: Array<{
    gate: number;
    line: number;
    color: number;
    tone: number;
    base: number;
    description: string;
  }>;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  hasProfile: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');
    const storedProfile = localStorage.getItem('user_profile');
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user_data');
      }
    }
    
    if (storedProfile) {
      try {
        const profileData = JSON.parse(storedProfile);
        setUserProfile(profileData);
      } catch (error) {
        console.error('Error parsing stored profile data:', error);
        localStorage.removeItem('user_profile');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.loginUser(email, password);
      setUser(response);
      setIsAuthenticated(true);
      localStorage.setItem('user_data', JSON.stringify(response));
      
      // Try to fetch user profile
      await refreshProfile();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await apiService.createUser(email, password);
      setUser(response);
      setIsAuthenticated(true);
      localStorage.setItem('user_data', JSON.stringify(response));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setUserProfile(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_profile');
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      let response;
      if (userProfile?.id) {
        // Update existing profile
        response = await apiService.updateUserProfile({
          ...userProfile,
          ...profileData,
        });
      } else {
        // Create new profile
        response = await apiService.createUserProfile({
          user_id: user.id,
          ...profileData,
        } as any);
      }
      
      setUserProfile(response);
      localStorage.setItem('user_profile', JSON.stringify(response));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const profiles = await apiService.getUserProfile(user.id);
      if (profiles.length > 0) {
        setUserProfile(profiles[0]);
        localStorage.setItem('user_profile', JSON.stringify(profiles[0]));
      }
    } catch (error) {
      console.error('Profile refresh error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    isAuthenticated,
    hasProfile: !!userProfile,
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};