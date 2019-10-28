import agent from '../agent';
import {
  PROFILE_PAGE_UNLOADED,
  PROFILE_PAGE_LOADED,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
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

export const loadAuthorArticle = (username, limit) => ({
  type: PROFILE_PAGE_LOADED,
  payload: Promise.all([agent.Profiles.get(username), agent.Articles.byAuthor(username, limit)(0)]),
  pager: agent.Articles.byAuthor(username, limit),
  limit,
});

export const loadFavoriteArticle = (username, limit) => ({
  type: PROFILE_PAGE_LOADED,
  payload: Promise.all([
    agent.Profiles.get(username),
    agent.Articles.favoritedBy(username, limit)(0),
  ]),
  pager: agent.Articles.favoritedBy(username, limit),
  limit,
});

export const unloadProfile = () => ({ type: PROFILE_PAGE_UNLOADED });
