import agent from '../agent';
import { RESET_REDIRECT, APP_LOAD, REDIRECT_TO } from '../constants/actionTypes';

export const redirectToUrl = path => ({ type: REDIRECT_TO, payload: path });

export const resetRedirect = () => ({ type: RESET_REDIRECT });

export const loadApp = token => ({
  type: APP_LOAD,
  payload: token ? agent.Auth.current() : null,
  token: token ? token : null,
});
