import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducer';
import { promiseMiddleware, localStorageMiddleware } from './middleware';

export const history = createBrowserHistory();

const _routerMiddleware = routerMiddleware(history);

const getMiddleware = () =>
  applyMiddleware(_routerMiddleware, promiseMiddleware, localStorageMiddleware);

export const store = createStore(createRootReducer(history), composeWithDevTools(getMiddleware()));
