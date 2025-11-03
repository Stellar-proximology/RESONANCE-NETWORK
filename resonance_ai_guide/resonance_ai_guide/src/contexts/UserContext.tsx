import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/apiService';

interface User {
  id: string;
  provider: string;
  created_at: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  createAnonymousUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user_data');
      }
    }
    setIsLoading(false);
  }, []);

  const createAnonymousUser = async () => {
    try {
      setIsLoading(true);
      const userData = await apiService.createAnonymousUser();
      setUser(userData);
      localStorage.setItem('user_data', JSON.stringify(userData));
    } catch (error) {
      console.error('Error creating anonymous user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    createAnonymousUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};