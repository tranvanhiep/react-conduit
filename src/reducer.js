import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './reducers/auth';
import app from './reducers/app';
import articleList from './reducers/articleList';
import article from './reducers/article';
import editor from './reducers/editor';
import settings from './reducers/settings';
import profile from './reducers/profile';
import home from './reducers/home';

export default combineReducers({
  auth,
  app,
  articleList,
  article,
  editor,
  settings,
  profile,
  home,
  routing: routerReducer,
});
