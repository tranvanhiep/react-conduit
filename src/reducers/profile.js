import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  FOLLOW_SUCCESS,
  UNFOLLOW_SUCCESS,
  FOLLOW_REQUEST,
  FOLLOW_FAILURE,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
} from '../constants/actionTypes';

const initialState = {
  profile: null,
  loaded: false,
  followRequesting: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_PAGE_LOADED: {
      const { profile } = payload[0];
      return { ...state, profile, loaded: true };
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
