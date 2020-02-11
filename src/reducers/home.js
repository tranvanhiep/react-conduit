import {
  LOAD_HOME_PAGE,
  LOAD_HOME_PAGE_SUCCESS,
  LOAD_HOME_PAGE_FAILURE,
  RESET_HOME_PAGE,
} from '../actions';
import produce from 'immer';

const initialState = {
  loading: false,
  tags: null,
  errors: null,
};

const reducer = produce((draftState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case LOAD_HOME_PAGE:
      draftState.loading = true;
      draftState.errors = null;
      break;
    case LOAD_HOME_PAGE_SUCCESS: {
      const { tags } = payload;
      draftState.loading = false;
      draftState.tags = tags;
      break;
    }
    case LOAD_HOME_PAGE_FAILURE:
      draftState.loading = false;
      draftState.errors = errors;
      break;
    case RESET_HOME_PAGE:
      draftState = initialState;
      break;
    default:
      break;
  }
});

export default (state = initialState, action) => reducer(state, action);
