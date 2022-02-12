import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const BASE_URL = 'https://reqres.in/api';

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const login = (email, password) => {};

  return (
    <AuthContext.Provider
      value={{
        login,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
