import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  username: string;
  role: string;
  token?: string;
}

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminData: AdminUser | null;
  login: (data: AdminUser) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    const stored = localStorage.getItem('adminLoggedIn');
    return stored === 'true';
  });

  const [adminData, setAdminData] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem('adminData');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (data: AdminUser) => {
    setIsAdminLoggedIn(true);
    setAdminData(data);
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminData', JSON.stringify(data));
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setAdminData(null);
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminData');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminData,
        login,
        logout
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
