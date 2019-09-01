import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOAD,
  ASYNC_START,
} from '../constants/actionTypes';

const initialState = {
  email: '',
  password: '',
  inProgress: false,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_FIELD_AUTH: {
      const { key, value } = payload;
      return {
        ...state,
        [key]: value,
      };
    }
    case LOGIN:
    case REGISTER: {
      const { hasError } = action;
      const { errors } = payload;
      return {
        ...state,
        inProgress: false,
        errors: hasError ? errors : null,
      };
    }
    case ASYNC_START: {
      const { subType } = action;
      if (subType === LOGIN || subType === REGISTER) {
        return {
          ...state,
          inProgress: true,
        };
      }
      break;
    }
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOAD:
      return initialState;
    default:
      return state;
  }
};
