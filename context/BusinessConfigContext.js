// context/BusinessConfigContext.js
import React, { createContext, useState, useContext } from 'react';

const BusinessConfigContext = createContext();

export const BusinessConfigProvider = ({ children }) => {
  const [businessConfig, setBusinessConfig] = useState(null);
  const [services, setServices] = useState(null);
  const [categories, setCategories] = useState(null);
  const [trending, setTrendingServices] = useState(null);
    

  return (
    <BusinessConfigContext.Provider value={{ businessConfig, setBusinessConfig, services, setServices, categories, setCategories, trending, setTrendingServices }}>
      {children}
    </BusinessConfigContext.Provider>
  );
};

export const useBusinessConfig = () => useContext(BusinessConfigContext);
