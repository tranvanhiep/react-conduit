import {
  SETTINGS_PAGE_LOADED,
  SETTINGS_PAGE_UNLOADED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  loaded: false,
  inProgress: false,
  submitted: false,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, errors } = action;

  switch (type) {
    case SETTINGS_PAGE_LOADED:
      return {
        ...state,
        loaded: true,
      };
    case SETTINGS_PAGE_UNLOADED:
      return initialState;
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        inProgress: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        errors: null,
        inProgress: false,
        submitted: true,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        errors,
        inProgress: false,
        submitted: false,
      };
    default:
      return state;
  }
};
