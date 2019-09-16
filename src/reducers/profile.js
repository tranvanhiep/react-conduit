import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  FOLLOW,
  UNFOLLOW,
} from '../constants/actionTypes';
import { PROFILE_PAGE } from '../constants';

const initialState = {
  profile: null,
  loaded: false,
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
    case FOLLOW:
    case UNFOLLOW: {
      const { pageName } = action;
      if (pageName === PROFILE_PAGE) {
        const { profile } = payload;
        return {
          ...state,
          profile,
        };
      }
      return state;
    }
    default:
      return state;
  }
};
