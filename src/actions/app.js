import agent from '../agent';
import {
  RESET_REDIRECT,
  APP_LOAD,
  REDIRECT_TO,
  SESSION_LOGIN,
  SESSION_LOGIN_SUCCESS,
  SESSION_LOGIN_FAILURE,
} from '../constants/actionTypes';
import { fulfilHandler, rejectHandler } from '../utils';
import { TOKEN_KEY } from '../constants/constants';

export const redirectToUrl = path => ({ type: REDIRECT_TO, payload: path });

export const resetRedirect = () => ({ type: RESET_REDIRECT });

export const loadApp = () => dispatch => {
  dispatch({ type: SESSION_LOGIN });

  return agent.Auth.current()
    .then(fulfilHandler(SESSION_LOGIN_SUCCESS, dispatch), err => {
      window.localStorage.removeItem(TOKEN_KEY);
      agent.destroyToken();
      return rejectHandler(SESSION_LOGIN_FAILURE, dispatch)(err);
    })
    .finally(() => {
      dispatch({ type: APP_LOAD });
    });
};
