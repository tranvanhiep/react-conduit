import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOAD,
} from '../constants/actionTypes';
import agent from '../agent';

export const updateFieldAuth = (key, value) => ({
  type: UPDATE_FIELD_AUTH,
  payload: { key, value },
});

export const login = (email, password) => ({
  type: LOGIN,
  payload: agent.Auth.login(email, password),
});

export const unloadLoginPage = () => ({ type: LOGIN_PAGE_UNLOADED });

export const unloadRegisterPage = () => ({ type: REGISTER_PAGE_UNLOAD });
