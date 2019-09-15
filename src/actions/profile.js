import agent from '../agent';
import {
  FOLLOW,
  UNFOLLOW,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from '../constants/actionTypes';

export const follow = username => ({
  type: FOLLOW,
  payload: agent.Profiles.follow(username),
});

export const unfollow = username => ({
  type: UNFOLLOW,
  payload: agent.Profiles.unfollow(username),
});

export const loadAuthorArticle = username => ({
  type: PROFILE_PAGE_LOADED,
  payload: Promise.all([agent.Profiles.get(username), agent.Articles.byAuthor(username)(0)]),
  pager: agent.Articles.byAuthor(username),
});

export const loadFavoriteArticle = username => ({
  type: PROFILE_PAGE_LOADED,
  payload: Promise.all([agent.Profiles.get(username), agent.Articles.favoritedBy(username)(0)]),
  pager: agent.Articles.favoritedBy(username),
});

export const unloadProfile = () => ({ type: PROFILE_PAGE_UNLOADED });
