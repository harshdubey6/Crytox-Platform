import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [rememberMe, setRememberMe] = useState(false);

  // Load authentication state from storage on initial load
  useEffect(() => {
    let storedAuth = localStorage.getItem('auth');
    let storageType = 'localStorage';
    if (!storedAuth) {
      storedAuth = sessionStorage.getItem('auth');
      storageType = 'sessionStorage';
    }
    if (storedAuth) {
      const { user, rememberMe } = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(user);
      setRememberMe(!!rememberMe);
    }
  }, []);

  // Load favorites from localStorage on initial load
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated]);

  const login = (userData, shouldRemember = false) => {
    setIsAuthenticated(true);
    setUser(userData);
    setRememberMe(shouldRemember);

    const authData = JSON.stringify({ user: userData, rememberMe: shouldRemember });
    if (shouldRemember) {
      localStorage.setItem('auth', authData);
      sessionStorage.removeItem('auth');
    } else {
      sessionStorage.setItem('auth', authData);
      localStorage.removeItem('auth');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setFavorites([]);
    setRememberMe(false);
    // Clear all auth-related data from both storages
    localStorage.removeItem('favorites');
    localStorage.removeItem('auth');
    sessionStorage.removeItem('auth');
  };

  const toggleFavorite = (coin) => {
    if (!isAuthenticated) return;
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === coin.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== coin.id);
      } else {
        return [...prevFavorites, coin];
      }
    });
  };

  const isFavorite = (coinId) => {
    return favorites.some(fav => fav.id === coinId);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      favorites,
      toggleFavorite,
      isFavorite,
      rememberMe,
      setRememberMe
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 