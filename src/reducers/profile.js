import { PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from '../constants/actionTypes';

const initialState = {
  profile: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_PAGE_LOADED: {
      const { profile } = payload[0];
      return { ...state, profile };
    }
    case PROFILE_PAGE_UNLOADED:
      return initialState;
    default:
      return state;
  }
};
