import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './reducers/auth';
import common from './reducers/common';
import articleList from './reducers/articleList';
import article from './reducers/article';
import editor from './reducers/editor';
import settings from './reducers/settings';
import profile from './reducers/profile';

export default combineReducers({
  auth,
  common,
  articleList,
  article,
  editor,
  settings,
  profile,
  routing: routerReducer,
});
