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
} from '../constants/actionTypes';

const initialState = {
  appName: 'Conduit',
  appLoaded: false,
  currentUser: null,
  redirectTo: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case APP_LOAD:
      return {
        ...state,
        appLoaded: true,
      };
    case SESSION_LOGIN_SUCCESS: {
      const { user: currentUser } = payload;
      return {
        ...state,
        currentUser,
      };
    }
    case SESSION_LOGIN_FAILURE: {
      return {
        ...state,
        currentUser: null,
      };
    }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      const { user } = payload;
      return {
        ...state,
        redirectTo: '/',
        currentUser: user,
      };
    }
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        redirectTo: '/',
      };
    case REDIRECT_TO:
      return {
        ...state,
        redirectTo: payload,
      };
    case RESET_REDIRECT:
      return {
        ...state,
        redirectTo: null,
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        redirectTo: '/',
      };
    case UPDATE_USER_SUCCESS: {
      const { user } = payload;
      const { username } = user;
      return {
        ...state,
        currentUser: user,
        redirectTo: `/profile/${username}`,
      };
    }
    case CREATE_ARTICLE_SUCCESS:
    case UPDATE_ARTICLE_SUCCESS: {
      const {
        article: { slug },
      } = payload;
      return { ...state, redirectTo: `/article/${slug}` };
    }
    default:
      return state;
  }
};
