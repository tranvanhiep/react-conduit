import agent from '../agent';
import {
  PROFILE_PAGE_UNLOADED,
  PROFILE_PAGE_LOADING,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  PROFILE_PAGE_LOAD_SUCCEEDED,
  PROFILE_PAGE_LOAD_FAILED,
} from '../constants/actionTypes';
import { fulfilHandler, rejectHandler } from '../utils';

export const follow = username => dispatch => {
  dispatch({ type: FOLLOW_REQUEST });

  return agent.Profiles.follow(username).then(
    fulfilHandler(FOLLOW_SUCCESS, dispatch),
    rejectHandler(FOLLOW_FAILURE, dispatch)
  );
};

export const unfollow = username => dispatch => {
  dispatch({ type: UNFOLLOW_REQUEST });

  return agent.Profiles.unfollow(username).then(
    fulfilHandler(UNFOLLOW_SUCCESS, dispatch),
    rejectHandler(UNFOLLOW_FAILURE, dispatch)
  );
};

export const loadProfilePage = username => dispatch => {
  dispatch({ type: PROFILE_PAGE_LOADING });

  return agent.Profiles.get(username).then(
    fulfilHandler(PROFILE_PAGE_LOAD_SUCCEEDED, dispatch),
    rejectHandler(PROFILE_PAGE_LOAD_FAILED, dispatch)
  );
};

export const unloadProfile = () => ({ type: PROFILE_PAGE_UNLOADED });
