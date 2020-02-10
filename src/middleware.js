import http from './http';
import { LOGOUT, LOGIN_SUCCESS, REGISTER_SUCCESS } from './actions';
import { TOKEN_KEY } from './constants';

const localStorageMiddleware = store => next => action => {
  const { type, payload } = action;

  if (type === LOGIN_SUCCESS || type === REGISTER_SUCCESS) {
    const {
      user: { token },
    } = payload;

    window.localStorage.setItem(TOKEN_KEY, token);
    http.setToken(token);
  } else if (type === LOGOUT) {
    window.localStorage.removeItem(TOKEN_KEY);
    http.setToken(null);
  }

  next(action);
};

export { localStorageMiddleware };
