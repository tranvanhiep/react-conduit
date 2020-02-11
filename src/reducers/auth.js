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
import produce from 'immer';

const initialState = {
  inProgress: false,
  errors: null,
};

const reducer = produce((draftState, action) => {
  const { type, errors } = action;

  switch (type) {
    case LOGIN:
    case REGISTER:
      draftState.inProgress = true;
      draftState.errors = null;
      break;
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      draftState.inProgress = false;
      break;
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      draftState.inProgress = false;
      draftState.errors = errors;
      break;
    case RESET_LOGIN_PAGE:
    case RESET_REGISTER_PAGE:
      draftState = initialState;
      break;
    default:
      break;
  }
});

export default (state = initialState, action) => reducer(state, action);
