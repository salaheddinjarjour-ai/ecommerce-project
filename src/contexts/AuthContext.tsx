import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  register: (name: string, email: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('trendit_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('trendit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('trendit_user');
    }
  }, [user]);

  const login = (email: string) => {
    // Mock login that just sets a fake user based on email
    setUser({
      id: 'usr_' + Date.now().toString(),
      name: email.split('@')[0],
      email,
    });
  };

  const register = (name: string, email: string) => {
    setUser({
      id: 'usr_' + Date.now().toString(),
      name,
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
