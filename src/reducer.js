import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './reducers/auth';
import common from './reducers/common';
import articleList from './reducers/articleList';
import article from './reducers/article';
import editor from './reducers/editor';
import settings from './reducers/settings';

export default history =>
  combineReducers({
    auth,
    common,
    articleList,
    article,
    editor,
    settings,
    router: connectRouter(history),
  });
