import { APP_LOAD } from '../constants/actionTypes';

const initialState = {
  appName: 'Conduit',
  token: null,
  appLoaded: false,
  currentUser: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case APP_LOAD: {
      const { token, user } = payload;
      return {
        ...state,
        token: token || null,
        appLoaded: true,
        currentUser: user ? user : null,
      };
    }

    default:
      return state;
  }
};
