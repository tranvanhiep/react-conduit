import {
  APP_LOAD,
  RESET_REDIRECT,
  REDIRECT_TO,
  LOGOUT,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  SESSION_LOGIN_SUCCESS,
  SESSION_LOGIN_FAILURE,
  UPDATE_USER_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_SUCCESS,
} from '../actions';
import produce from 'immer';

const initialState = {
  appName: 'Conduit',
  appLoaded: false,
  currentUser: null,
  redirectTo: null,
};

const reducer = produce((draftState, action) => {
  const { type, payload } = action;

  switch (type) {
    case APP_LOAD:
      draftState.appLoaded = true;
      break;
    case SESSION_LOGIN_SUCCESS: {
      const { user } = payload;
      draftState.currentUser = user;
      break;
    }
    case SESSION_LOGIN_FAILURE: {
      draftState.currentUser = null;
      break;
    }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      const { user } = payload;
      draftState.redirectTo = '/';
      draftState.currentUser = user;
      break;
    }
    case LOGOUT:
      draftState.currentUser = null;
      draftState.redirectTo = '/';
      break;
    case REDIRECT_TO:
      draftState.redirectTo = payload;
      break;
    case RESET_REDIRECT:
      draftState.redirectTo = null;
      break;
    case DELETE_ARTICLE_SUCCESS:
      draftState.redirectTo = '/';
      break;
    case UPDATE_USER_SUCCESS: {
      const { user } = payload;
      const { username } = user;
      draftState.currentUser = user;
      draftState.redirectTo = `/profile/${username}`;
      break;
    }
    case CREATE_ARTICLE_SUCCESS:
    case UPDATE_ARTICLE_SUCCESS: {
      const {
        article: { slug },
      } = payload;
      draftState.redirectTo = `/article/${slug}`;
      break;
    }
    default:
      break;
  }
});

export default (state = initialState, action) => reducer(state, action);
