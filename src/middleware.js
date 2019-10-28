import agent from './agent';
import { LOGOUT, LOGIN_SUCCESS, REGISTER_SUCCESS } from './constants/actionTypes';

const isPromise = _promise => _promise && typeof _promise.then === 'function';
console.log(process.env.NODE_ENV);

const promiseMiddleware = store => next => action => {
  const { payload } = action;
  if (isPromise(payload)) {
    payload.then(console.log);
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  const { type, payload } = action;

  if (type === LOGIN_SUCCESS || type === REGISTER_SUCCESS) {
    const {
      user: { token },
    } = payload;

    window.localStorage.setItem('jwt', token);
    agent.setToken(token);
  } else if (type === LOGOUT) {
    window.localStorage.removeItem('jwt');
    agent.setToken(null);
  }

  next(action);
};

export { promiseMiddleware, localStorageMiddleware };
