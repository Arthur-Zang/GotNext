import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationAuthContext = createContext();

export const LocationAuthProvider = ({ children }) => {
  const [selectedCourt, setSelectedCourt] = useState(null);

  useEffect(() => {
    const fetchSelectedCourt = async () => {
      try {
        // Fetch the selected court from AsyncStorage
        const storedCourt = await AsyncStorage.getItem('selectedCourt');
        if (storedCourt) {
          setSelectedCourt(JSON.parse(storedCourt));
        }
      } catch (error) {
        console.error('Error fetching selected court from storage:', error);
      }
    };

    fetchSelectedCourt();
  }, []);

  const setSelectedCourtAsync = async (court) => {
    try {
      // Store the selected court in AsyncStorage
      await AsyncStorage.setItem('selectedCourt', JSON.stringify(court));
      setSelectedCourt(court);
    } catch (error) {
      console.error('Error storing selected court:', error);
    }
  };

  const clearSelectedCourtAsync = async () => {
    try {
      // Clear the selected court from AsyncStorage
      await AsyncStorage.removeItem('selectedCourt');
      setSelectedCourt(null);
    } catch (error) {
      console.error('Error removing selected court from storage:', error);
    }
  };

  return (
    <LocationAuthContext.Provider
      value={{ selectedCourt, setSelectedCourtAsync, clearSelectedCourtAsync }}
    >
      {children}
    </LocationAuthContext.Provider>
  );
};

export const useLocationAuth = () => {
  const context = useContext(LocationAuthContext);
  if (!context) {
    throw new Error('useLocationAuth must be used within a LocationAuthProvider');
  }
  return context;
};