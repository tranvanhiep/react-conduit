import agent from '../agent';
import {
  FOLLOW,
  UNFOLLOW,
  PROFILE_PAGE_UNLOADED,
  PROFILE_PAGE_LOADED,
} from '../constants/actionTypes';

export const follow = (username, pageName) => ({
  type: FOLLOW,
  payload: agent.Profiles.follow(username),
  pageName,
});

export const unfollow = (username, pageName) => ({
  type: UNFOLLOW,
  payload: agent.Profiles.unfollow(username),
  pageName,
});

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
