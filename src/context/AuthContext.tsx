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

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Login failed');
      }

      const { token } = await response.json();
      const decoded = jwtDecode(token);

      setStoredToken(token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token,
          user: {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name,
          },
        },
      });

      return { token, user: decoded };
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
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Registration failed');
    }

    const { token } = await response.json();
    const decoded = jwtDecode(token);

    setStoredToken(token);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        token,
        user: {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          name: decoded.name,
        },
      },
    });

    return { token, user: decoded };
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