import agent from '../agent';
import {
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOAD,
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../constants/actionTypes';
import { fulfilHandler, rejectHandler } from '../utils';

export const login = (email, password) => dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  return agent.Auth.login(email, password).then(
    fulfilHandler(LOGIN_SUCCESS, dispatch),
    rejectHandler(LOGIN_FAILURE, dispatch)
  );
};

export const register = (username, email, password) => dispatch => {
  dispatch({ type: REGISTER_REQUEST });

  return agent.Auth.register(username, email, password).then(
    fulfilHandler(REGISTER_SUCCESS, dispatch),
    rejectHandler(REGISTER_FAILURE, dispatch)
  );
};

export const logout = () => ({
  type: LOGOUT,
});

export const updateUser = user => dispatch => {
  dispatch({ type: UPDATE_USER_REQUEST });

  return agent.Auth.update(user).then(
    fulfilHandler(UPDATE_USER_SUCCESS, dispatch),
    rejectHandler(UPDATE_USER_FAILURE, dispatch)
  );
};

export const unloadLoginPage = () => ({ type: LOGIN_PAGE_UNLOADED });

export const unloadRegisterPage = () => ({ type: REGISTER_PAGE_UNLOAD });
