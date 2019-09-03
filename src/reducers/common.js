import { APP_LOAD, LOGIN, REGISTER, REDIRECT } from '../constants/actionTypes';

const initialState = {
  appName: 'Conduit',
  token: null,
  appLoaded: false,
  currentUser: null,
  redirectTo: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case APP_LOAD: {
      const { token } = action;
      return {
        ...state,
        token: token || null,
        appLoaded: true,
        currentUser: payload ? payload.user : null,
      };
    }
    case LOGIN:
    case REGISTER: {
      const { hasError } = action;
      const { user } = payload;
      return {
        ...state,
        redirectTo: hasError ? null : '/',
        token: hasError ? null : user.token,
        currentUser: hasError ? null : user,
      };
    }
    case REDIRECT:
      return {
        ...state,
        redirectTo: null,
      };
    default:
      return state;
  }
};
