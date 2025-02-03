import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const storedToken = Cookies.get('jwt');
    if (storedToken) {
      const decodedToken = JSON.parse(atob(storedToken.split('.')[1])); // Decodificar el token JWT
      setToken(storedToken);
      setProfilePhoto(decodedToken.photo); // Guardar la foto del token
    }
  }, []);

  const saveToken = (newToken) => {
    const decodedToken = JSON.parse(atob(newToken.split('.')[1])); // Decodificar el token JWT
    setToken(newToken);
    setProfilePhoto(decodedToken.photo);
    Cookies.set('jwt', newToken, { expires: 7, secure: true, sameSite: 'None' });
  };

  const clearToken = () => {
    setToken(null);
    setProfilePhoto(null);
    Cookies.remove('jwt', { secure: true, sameSite: 'None' });
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken, profilePhoto }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
