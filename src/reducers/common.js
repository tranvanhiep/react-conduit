import {
  APP_LOAD,
  LOGIN,
  REGISTER,
  RESET_REDIRECT,
  DELETE_ARTICLE,
  REDIRECT_TO,
  LOGOUT,
  UPDATE_USER,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
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
    case APP_LOAD: {
      if (payload) {
        const { hasError } = action;
        const { user } = payload;
        return {
          ...state,
          currentUser: hasError ? null : user,
        };
      }
      return {
        ...state,
        appLoaded: true,
      };
    }
    case LOGIN:
    case REGISTER: {
      const { hasError } = action;
      const { user } = payload;
      return {
        ...state,
        redirectTo: hasError ? null : '/',
        currentUser: hasError ? null : user,
      };
    }
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        redirectTo: '/',
      };
    case REDIRECT_TO:
      return { ...state, redirectTo: payload };
    case RESET_REDIRECT:
      return { ...state, redirectTo: null };
    case DELETE_ARTICLE: {
      const { hasError } = action;
      return { ...state, redirectTo: hasError ? null : '/' };
    }
    case UPDATE_USER: {
      const { user } = payload;
      const { hasError } = action;
      if (!hasError) {
        const { username } = user;
        return {
          ...state,
          currentUser: user,
          redirectTo: `/profile/${username}`,
        };
      }
      return state;
    }
    case CREATE_ARTICLE:
    case UPDATE_ARTICLE: {
      const { hasError } = action;
      if (!hasError) {
        const {
          article: { slug },
        } = payload;
        return { ...state, redirectTo: `/article/${slug}` };
      }
      return state;
    }
    default:
      return state;
  }
};
