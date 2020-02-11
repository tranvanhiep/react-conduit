import {
  LOAD_SETTINGS_PAGE,
  RESET_SETTINGS_PAGE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../actions';
import produce from 'immer';

const initialState = {
  loaded: false,
  inProgress: false,
  submitted: false,
  errors: null,
};

const reducer = produce((draftState, action) => {
  const { type, errors } = action;

  switch (type) {
    case LOAD_SETTINGS_PAGE:
      draftState.loaded = true;
      draftState.errors = null;
      break;
    case RESET_SETTINGS_PAGE:
      draftState = initialState;
      break;
    case UPDATE_USER:
      draftState.inProgress = true;
      draftState.errors = null;
      break;
    case UPDATE_USER_SUCCESS:
      draftState.inProgress = false;
      draftState.submitted = true;
      break;
    case UPDATE_USER_FAILURE:
      draftState.inProgress = false;
      draftState.submitted = false;
      draftState.errors = errors;
      break;
    default:
      break;
  }
});

export default (state = initialState, action) => reducer(state, action);
