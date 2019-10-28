import {
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOAD,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, errors } = action;

  switch (type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        inProgress: false,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        inProgress: false,
        errors,
      };
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOAD:
      return initialState;
    default:
      return state;
  }
};
