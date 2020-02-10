import {
  LOAD_HOME_PAGE,
  LOAD_HOME_PAGE_SUCCESS,
  LOAD_HOME_PAGE_FAILURE,
  RESET_HOME_PAGE,
} from '../actions';

const initialState = {
  loading: false,
  tags: null,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case LOAD_HOME_PAGE:
      return { ...state, loading: true, errors: null };
    case LOAD_HOME_PAGE_SUCCESS: {
      const { tags } = payload;
      return { ...state, loading: false, tags };
    }
    case LOAD_HOME_PAGE_FAILURE:
      return { ...state, loading: false, errors };
    case RESET_HOME_PAGE:
      return initialState;
    default:
      return state;
  }
};
