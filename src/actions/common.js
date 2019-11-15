import agent from '../agent';
import {
  RESET_REDIRECT,
  APP_LOAD,
  REDIRECT_TO,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAILURE,
} from '../constants/actionTypes';
import { fulfilHandler, rejectHandler } from '../utils';
import { TOKEN_KEY } from '../constants/constants';

export const redirectToUrl = path => ({ type: REDIRECT_TO, payload: path });

export const resetRedirect = () => ({ type: RESET_REDIRECT });

export const loadApp = () => dispatch => {
  dispatch({ type: CURRENT_USER_REQUEST });

  return agent.Auth.current()
    .then(fulfilHandler(CURRENT_USER_SUCCESS, dispatch), err => {
      window.localStorage.removeItem(TOKEN_KEY);
      agent.destroyToken();
      return rejectHandler(CURRENT_USER_FAILURE, dispatch)(err);
    })
    .finally(() => {
      dispatch({ type: APP_LOAD });
    });
};
