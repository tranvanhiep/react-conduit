import http from '../http';
import { fulfilHandler, rejectHandler } from '../utils';

export const RESET_LOGIN_PAGE = 'RESET_LOGIN_PAGE';
export const RESET_REGISTER_PAGE = 'RESET_REGISTER_PAGE';

export const LOGOUT = 'LOGOUT';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const login = (email, password) => dispatch => {
  dispatch({ type: LOGIN });

  return http.Auth.login(email, password).then(
    fulfilHandler(LOGIN_SUCCESS, dispatch),
    rejectHandler(LOGIN_FAILURE, dispatch)
  );
};

export const register = (username, email, password) => dispatch => {
  dispatch({ type: REGISTER });

  return http.Auth.register(username, email, password).then(
    fulfilHandler(REGISTER_SUCCESS, dispatch),
    rejectHandler(REGISTER_FAILURE, dispatch)
  );
};

export const logout = () => ({
  type: LOGOUT,
});

export const unloadLoginPage = () => ({ type: RESET_LOGIN_PAGE });

export const unloadRegisterPage = () => ({ type: RESET_REGISTER_PAGE });
