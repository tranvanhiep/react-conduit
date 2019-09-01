import agent from './agent';
import { ASYNC_START, LOGIN, REGISTER, LOGOUT } from './constants/actionTypes';

const isPromise = _promise => _promise && typeof _promise.then === 'function';

const promiseMiddleware = store => next => action => {
  const { type, payload } = action;
  if (isPromise(payload)) {
    store.dispatch({ type: ASYNC_START, subType: type });

    payload.then(
      res => {
        console.log('RESULT', res);
        action.payload = res;
        store.dispatch(action);
      },
      err => {
        console.log('ERROR', err);
        action.hasError = true;
        action.payload = err.response.body;
        store.dispatch(action);
      }
    );
    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  const { type, payload, hasError } = action;

  if (type === LOGIN || type === REGISTER) {
    if (!hasError) {
      const {
        user: { token },
      } = payload;

      window.localStorage.setItem('jwt', token);
      agent.setToken(token);
    }
  } else if (type === LOGOUT) {
    window.localStorage.removeItem('jwt');
    agent.setToken(null);
  }

  next(action);
};

export { promiseMiddleware, localStorageMiddleware };
