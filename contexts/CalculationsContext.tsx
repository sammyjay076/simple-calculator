import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Calculation {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

interface CalculationsContextType {
  calculations: Calculation[];
  addCalculation: (expression: string, result: string) => void;
  clearHistory: () => void;
}

const CalculationsContext = createContext<CalculationsContextType>({
  calculations: [],
  addCalculation: () => {},
  clearHistory: () => {},
});

export const CalculationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [calculations, setCalculations] = useState<Calculation[]>([]);

  useEffect(() => {
    loadCalculations();
  }, []);

  const loadCalculations = async () => {
    try {
      const storedCalculations = await AsyncStorage.getItem('calculations');
      if (storedCalculations) {
        setCalculations(JSON.parse(storedCalculations));
      }
    } catch (error) {
      console.error('Error loading calculations:', error);
    }
  };

  const saveCalculations = async (updatedCalculations: Calculation[]) => {
    try {
      await AsyncStorage.setItem('calculations', JSON.stringify(updatedCalculations));
    } catch (error) {
      console.error('Error saving calculations:', error);
    }
  };

  const addCalculation = (expression: string, result: string) => {
    const newCalculation: Calculation = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: Date.now(),
    };

    const updatedCalculations = [newCalculation, ...calculations];
    setCalculations(updatedCalculations);
    saveCalculations(updatedCalculations);
  };

  const clearHistory = () => {
    setCalculations([]);
    saveCalculations([]);
  };

  return (
    <CalculationsContext.Provider
      value={{
        calculations,
        addCalculation,
        clearHistory,
      }}
    >
      {children}
    </CalculationsContext.Provider>
  );
};

export const useCalculations = () => useContext(CalculationsContext);