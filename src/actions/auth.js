import agent from '../agent';
import {
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOAD,
  REGISTER,
  UPDATE_USER,
  LOGOUT,
} from '../constants/actionTypes';

export const login = (email, password) => ({
  type: LOGIN,
  payload: agent.Auth.login(email, password),
});

export const register = (username, email, password) => ({
  type: REGISTER,
  payload: agent.Auth.register(username, email, password),
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: agent.Auth.update(user),
});

export const unloadLoginPage = () => ({ type: LOGIN_PAGE_UNLOADED });

export const unloadRegisterPage = () => ({ type: REGISTER_PAGE_UNLOAD });
