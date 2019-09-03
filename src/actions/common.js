import agent from '../agent';
import { REDIRECT, APP_LOAD } from '../constants/actionTypes';

export const redirect = () => ({ type: REDIRECT });

export const loadApp = token => ({
  type: APP_LOAD,
  payload: token ? agent.Auth.current() : null,
  token: token ? token : null,
});
