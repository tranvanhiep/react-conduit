import {
  RESET_LOGIN_PAGE,
  RESET_REGISTER_PAGE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../actions';

const initialState = {
  inProgress: false,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, errors } = action;

  switch (type) {
    case LOGIN:
    case REGISTER:
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
    case RESET_LOGIN_PAGE:
    case RESET_REGISTER_PAGE:
      return initialState;
    default:
      return state;
  }
};
