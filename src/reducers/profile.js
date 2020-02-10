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

const initialState = {
  profile: null,
  loading: true,
  followRequesting: false,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case LOAD_PROFILE_PAGE:
      return {
        ...state,
        loading: true,
      };
    case LOAD_PROFILE_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        errors,
      };
    case LOAD_PROFILE_PAGE_SUCCESS: {
      const { profile } = payload;
      return {
        ...state,
        profile,
        loading: false,
        errors: null,
      };
    }
    case RESET_PROFILE_PAGE:
      return initialState;
    case FOLLOW:
    case UNFOLLOW:
      return {
        ...state,
        followRequesting: true,
      };
    case FOLLOW_FAILURE:
    case UNFOLLOW_FAILURE:
      return {
        ...state,
        followRequesting: false,
      };
    case FOLLOW_SUCCESS:
    case UNFOLLOW_SUCCESS: {
      const { profile } = payload;
      return {
        ...state,
        profile,
        followRequesting: false,
      };
    }
    default:
      return state;
  }
};
