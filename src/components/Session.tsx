"use client";
// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of the context data
interface AuthContextType {
  user: { [key: string]: any } | null;
  accessTime: Date | null;
}

// Create a default value for the context
const defaultContextValue: AuthContextType = {
  user: null,
  accessTime: null,
};

// Create the context
const AuthContext = createContext<AuthContextType>(defaultContextValue);

// Create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);

// Create the provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [accessTime, setAccessTime] =
    useState<AuthContextType["accessTime"]>(null);

  useEffect(() => {
    // Fetch user credentials from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Set the current time as the access time
    setAccessTime(new Date());
  }, []);

  useEffect(() => {
    // Optionally update local storage or perform side effects
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, accessTime }}>
      {children}
    </AuthContext.Provider>
  );
};
