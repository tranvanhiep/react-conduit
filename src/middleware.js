import agent from './agent';
import { LOGOUT, LOGIN_SUCCESS, REGISTER_SUCCESS } from './constants/actionTypes';
import { TOKEN_KEY } from './constants/constants';

const localStorageMiddleware = store => next => action => {
  const { type, payload } = action;

  if (type === LOGIN_SUCCESS || type === REGISTER_SUCCESS) {
    const {
      user: { token },
    } = payload;

    window.localStorage.setItem(TOKEN_KEY, token);
    agent.setToken(token);
  } else if (type === LOGOUT) {
    window.localStorage.removeItem(TOKEN_KEY);
    agent.setToken(null);
  }

  next(action);
};

export { localStorageMiddleware };
