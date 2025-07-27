import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getStoredToken, setStoredToken, removeStoredToken } from '../utils/tokenHelpers';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = () => {
      const token = getStoredToken();
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp > currentTime) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: {
                  id: decoded.id,
                  email: decoded.email,
                  role: decoded.role,
                  name: decoded.name,
                },
                token,
              },
            });
          } else {
            removeStoredToken();
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } catch (error) {
          removeStoredToken();
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  // const login = async (email, password) => {
  //   dispatch({ type: 'SET_LOADING', payload: true });
  //   dispatch({ type: 'CLEAR_ERROR' });

  //   try {
  //     // Mock API call - replace with actual API
  //     const mockResponse = await new Promise((resolve) => {
  //       setTimeout(() => {
  //         // Mock user data based on email
  //         const mockUsers = {
  //           'student@test.com': { id: 1, email: 'student@test.com', role: 'STUDENT', name: 'John Student' },
  //           'recruiter@test.com': { id: 2, email: 'recruiter@test.com', role: 'RECRUITER', name: 'Jane Recruiter' },
  //           'admin@test.com': { id: 3, email: 'admin@test.com', role: 'ADMIN', name: 'Admin User' },
  //         };

  //         const user = mockUsers[email];
  //         if (user && password === 'password') {
  //           const token = `mock.jwt.token.${user.role}.${user.id}`;
  //           resolve({ user, token });
  //         } else {
  //           throw new Error('Invalid credentials');
  //         }
  //       }, 1000);
  //     });

  //     setStoredToken(mockResponse.token);
  //     dispatch({
  //       type: 'LOGIN_SUCCESS',
  //       payload: mockResponse,
  //     });

  //     return mockResponse;
  //   } catch (error) {
  //     dispatch({
  //       type: 'SET_ERROR',
  //       payload: error.message || 'Login failed',
  //     });
  //     throw error;
  //   }
  // };



  const login = async (email, password) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'CLEAR_ERROR' });

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(text || 'Login failed');
    }

    const token = text;
    setStoredToken(token);

    const decoded = jwtDecode(token);
    const user = {
      id: decoded.id || null,
      email: decoded.sub || decoded.email,
      role: decoded.role,
      name: decoded.name || '',
    };

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user, token },
    });

    return { user, token };
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error.message || 'Login failed',
    });
    throw error;
  }
};




  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      // Mock API call - replace with actual API
      const mockResponse = await new Promise((resolve) => {
        setTimeout(() => {
          const user = {
            id: Date.now(),
            email: userData.email,
            role: userData.role,
            name: userData.name,
          };
          const token = `mock.jwt.token.${user.role}.${user.id}`;
          resolve({ user, token });
        }, 1000);
      });

      setStoredToken(mockResponse.token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: mockResponse,
      });

      return mockResponse;
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message || 'Registration failed',
      });
      throw error;
    }
  };

  const logout = () => {
    removeStoredToken();
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};