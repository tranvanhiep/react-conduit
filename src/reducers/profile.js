import {
  PROFILE_PAGE_UNLOADED,
  FOLLOW_SUCCESS,
  UNFOLLOW_SUCCESS,
  FOLLOW_REQUEST,
  FOLLOW_FAILURE,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  PROFILE_PAGE_LOAD_SUCCEEDED,
  PROFILE_PAGE_LOADING,
  PROFILE_PAGE_LOAD_FAILED,
} from '../constants/actionTypes';

const initialState = {
  profile: null,
  profileLoading: true,
  followRequesting: false,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case PROFILE_PAGE_LOADING:
      return {
        ...state,
        profileLoading: true,
      };
    case PROFILE_PAGE_LOAD_FAILED:
      return {
        ...state,
        profileLoading: false,
        errors,
      };
    case PROFILE_PAGE_LOAD_SUCCEEDED: {
      const { profile } = payload;
      return {
        ...state,
        profile,
        profileLoading: false,
        errors: null,
      };
    }
    case PROFILE_PAGE_UNLOADED:
      return initialState;
    case FOLLOW_REQUEST:
    case UNFOLLOW_REQUEST:
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
