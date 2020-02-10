import http from '../http';
import { fulfilHandler, rejectHandler } from '../utils';

export const LOAD_PROFILE_PAGE = 'LOAD_PROFILE_PAGE';
export const LOAD_PROFILE_PAGE_SUCCESS = 'LOAD_PROFILE_PAGE_SUCCESS';
export const LOAD_PROFILE_PAGE_FAILURE = 'LOAD_PROFILE_PAGE_FAILURE';
export const RESET_PROFILE_PAGE = 'RESET_PROFILE_PAGE';

export const FOLLOW = 'FOLLOW';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW = 'UNFOLLOW';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const follow = username => dispatch => {
  dispatch({ type: FOLLOW });

  return http.Profiles.follow(username).then(
    fulfilHandler(FOLLOW_SUCCESS, dispatch),
    rejectHandler(FOLLOW_FAILURE, dispatch)
  );
};

export const unfollow = username => dispatch => {
  dispatch({ type: UNFOLLOW });

  return http.Profiles.unfollow(username).then(
    fulfilHandler(UNFOLLOW_SUCCESS, dispatch),
    rejectHandler(UNFOLLOW_FAILURE, dispatch)
  );
};

export const loadProfilePage = username => dispatch => {
  dispatch({ type: LOAD_PROFILE_PAGE });

  return http.Profiles.get(username).then(
    fulfilHandler(LOAD_PROFILE_PAGE_SUCCESS, dispatch),
    rejectHandler(LOAD_PROFILE_PAGE_FAILURE, dispatch)
  );
};

export const unloadProfile = () => ({ type: RESET_PROFILE_PAGE });
