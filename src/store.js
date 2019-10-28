import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const browserHistory = createBrowserHistory();

const _routerMiddleware = routerMiddleware(browserHistory);

const logger = createLogger();

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(_routerMiddleware, thunkMiddleware, localStorageMiddleware);
  }
  return applyMiddleware(
    _routerMiddleware,
    thunkMiddleware,
    promiseMiddleware,
    localStorageMiddleware,
    logger
  );
};

export const store = createStore(rootReducer, composeWithDevTools(getMiddleware()));

export const history = syncHistoryWithStore(browserHistory, store);
