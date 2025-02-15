// frontend/src/context/InspectionContext.js
import React, { createContext, useState } from 'react';

export const InspectionContext = createContext();

const InspectionProvider = ({ children }) => {
  const [inspections, setInspections] = useState([]);

  return (
    <InspectionContext.Provider value={{ inspections, setInspections }}>
      {children}
    </InspectionContext.Provider>
  );
};

export default InspectionProvider;
