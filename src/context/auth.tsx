import React, { useState, useContext, useEffect, createContext, ReactNode } from 'react';
import { jwtDecode } from "jwt-decode"
import axiosInstance from '../utils/axios';
import { get } from 'react-hook-form';

interface Shift {
  shift: string;
  availability: object;
}

interface AuthContextType {
  isSigned: boolean;
  loading: boolean;
  token: string | undefined;
  scheduleData: Shift[];
  currentWeek: string;
  currentYear: string;
  currentDate: string;
  setData: React.Dispatch<React.SetStateAction<{ isSigned: boolean; loading: boolean; currentWeek: string, currentYear: string, currentDate: string; token: string | undefined, scheduleData: Shift[] }>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getCurrentWeek = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const week = Math.floor(diff / oneWeek);
    return week;
  };

  const getCurrentYear = () => {
    const now = new Date();
    return now.getFullYear();
  };

  const InitialState = {
    isSigned: false,
    loading: false,
    token: null,
    scheduleData: null,
    currentWeek: getCurrentWeek().toString(),
    currentYear: getCurrentYear().toString(),
    currentDate: null,
  };

  const [data, setData] = useState(InitialState);

  useEffect(() => {
    // Your code here
  }, []);

  return <AuthContext.Provider value={{ ...data, setData }}>{children}</AuthContext.Provider>;
};

const fetchAccessToken = (): string | undefined => {
  const token = localStorage.getItem('accessToken');

  if (!token) return;

  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < new Date().getTime()) return;

  return token;
};

const testAccessToken = (): boolean | undefined => {
  const token = localStorage.getItem('accessToken');

  if (!token) return;

  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < new Date().getTime()) {
    return false;
  }
};

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider };
