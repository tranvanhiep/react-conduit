import http from '../http';
import { fulfilHandler, rejectHandler } from '../utils';
import { TOKEN_KEY } from '../constants';

export const RESET_REDIRECT = 'RESET_REDIRECT';
export const REDIRECT_TO = 'REDIRECT_TO';

export const APP_LOAD = 'APP_LOAD';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS';
export const SESSION_LOGIN_FAILURE = 'SESSION_LOGIN_FAILURE';

export const redirectToUrl = path => ({ type: REDIRECT_TO, payload: path });

export const resetRedirect = () => ({ type: RESET_REDIRECT });

export const loadApp = () => dispatch => {
  dispatch({ type: SESSION_LOGIN });

  return http.Auth.current()
    .then(fulfilHandler(SESSION_LOGIN_SUCCESS, dispatch), err => {
      window.localStorage.removeItem(TOKEN_KEY);
      http.destroyToken();
      return rejectHandler(SESSION_LOGIN_FAILURE, dispatch)(err);
    })
    .finally(() => {
      dispatch({ type: APP_LOAD });
    });
};
