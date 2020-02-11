import {
  RESET_PROFILE_PAGE,
  FOLLOW_SUCCESS,
  UNFOLLOW_SUCCESS,
  FOLLOW,
  FOLLOW_FAILURE,
  UNFOLLOW_FAILURE,
  UNFOLLOW,
  LOAD_PROFILE_PAGE_SUCCESS,
  LOAD_PROFILE_PAGE,
  LOAD_PROFILE_PAGE_FAILURE,
} from '../actions';
import produce from 'immer';

const initialState = {
  profile: null,
  loading: true,
  following: false,
  errors: null,
};

const reducer = produce((draftState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case LOAD_PROFILE_PAGE:
      draftState.loading = true;
      draftState.errors = null;
      break;
    case LOAD_PROFILE_PAGE_FAILURE:
      draftState.loading = false;
      draftState.errors = errors;
      break;
    case LOAD_PROFILE_PAGE_SUCCESS: {
      const { profile } = payload;
      draftState.loading = false;
      draftState.profile = profile;
      break;
    }
    case RESET_PROFILE_PAGE:
      draftState = initialState;
      break;
    case FOLLOW:
    case UNFOLLOW:
      draftState.following = true;
      break;
    case FOLLOW_FAILURE:
    case UNFOLLOW_FAILURE:
      draftState.following = false;
      break;
    case FOLLOW_SUCCESS:
    case UNFOLLOW_SUCCESS: {
      const { profile } = payload;
      draftState.following = false;
      draftState.profile = profile;
      break;
    }
    default:
      break;
  }
});

export default (state = initialState, action) => reducer(state, action);
