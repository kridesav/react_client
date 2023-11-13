import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const apiServer = 'https://ticketguru-tg.rahtiapp.fi/api';

  const login = (username, password) => {
    const credentials = btoa(`${username}:${password}`);
    setAuth(credentials);
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, apiServer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}