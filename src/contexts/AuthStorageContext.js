import React, { createContext, useContext } from 'react';

const AuthStorageContext = createContext();

// Provider component to wrap the app and provide AuthStorage instance
export const AuthStorageProvider = ({ authStorage, children }) => {
  return (
    <AuthStorageContext.Provider value={authStorage}>
      {children}
    </AuthStorageContext.Provider>
  );
};

// Hook to use AuthStorage context
export const useAuthStorage = () => {
  const context = useContext(AuthStorageContext);
  
  if (!context) {
    throw new Error('useAuthStorage must be used within an AuthStorageProvider');
  }
  
  return context;
};