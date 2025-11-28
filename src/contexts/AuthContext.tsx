import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'citizen' | 'business' | 'officer' | 'admin';
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo user
    setUser({
      id: '1',
      email,
      fullName: 'Demo User',
      phone: '+251911234567',
      role: 'citizen',
      verified: true,
    });
  };

  const register = async (data: RegisterData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser({
      id: '1',
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      role: 'citizen',
      verified: false,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
