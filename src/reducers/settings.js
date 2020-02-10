import {
  LOAD_SETTINGS_PAGE,
  RESET_SETTINGS_PAGE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../actions';

const initialState = {
  loaded: false,
  inProgress: false,
  submitted: false,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, errors } = action;

  switch (type) {
    case LOAD_SETTINGS_PAGE:
      return {
        ...state,
        loaded: true,
      };
    case RESET_SETTINGS_PAGE:
      return initialState;
    case UPDATE_USER:
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
