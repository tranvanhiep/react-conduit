import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();

const _routerMiddleware = routerMiddleware(browserHistory);

const getMiddleware = () =>
  applyMiddleware(_routerMiddleware, promiseMiddleware, localStorageMiddleware);

export const store = createStore(rootReducer, composeWithDevTools(getMiddleware()));

export const history = syncHistoryWithStore(browserHistory, store);
