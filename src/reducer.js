import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './reducers/auth';
import common from './reducers/common';
import articleList from './reducers/articleList';

export default history =>
  combineReducers({ auth, common, articleList, router: connectRouter(history) });
