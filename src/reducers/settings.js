import {
  SETTINGS_PAGE_LOADED,
  SETTINGS_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_USER,
} from '../constants/actionTypes';

const initialState = {
  loaded: false,
  inProgress: false,
  submitted: false,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SETTINGS_PAGE_LOADED:
      return {
        ...state,
        loaded: true,
      };
    case SETTINGS_PAGE_UNLOADED:
      return initialState;
    case ASYNC_START: {
      const { subType } = action;
      if (subType === UPDATE_USER) {
        return { ...state, inProgress: true };
      }
      return state;
    }
    case UPDATE_USER: {
      const { hasError } = action;
      const { errors } = payload;
      return {
        ...state,
        errors: hasError ? errors : null,
        submitted: !hasError,
        inProgress: false,
      };
    }
    default:
      return state;
  }
};
