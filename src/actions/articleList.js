import agent from '../agent';
import {
  CHANGE_TAB,
  SET_PAGE,
  APPLY_TAG_FILTER,
  CHANGE_TAB_PROFILE,
} from '../constants/actionTypes';

export const changeTab = (tab, limit) => ({
  type: CHANGE_TAB,
  payload: tab === 'feed' ? agent.Articles.feed(limit)(0) : agent.Articles.all(limit)(0),
  pager: tab === 'feed' ? agent.Articles.feed(limit) : agent.Articles.all(limit),
  tab,
  limit,
});

export const setPage = (page, pager) => ({
  type: SET_PAGE,
  payload: pager(page),
  currentPage: page + 1,
});

export const setTagFilter = (tag, pager, limit) => ({
  type: APPLY_TAG_FILTER,
  payload: pager(tag, limit)(0),
  pager: pager(tag, limit),
  tag,
  limit,
});

export const changeTabProfile = (tab, username, limit) => ({
  type: CHANGE_TAB_PROFILE,
  payload:
    tab === 'favorites'
      ? agent.Articles.favoritedBy(username, limit)(0)
      : agent.Articles.byAuthor(username, limit)(0),
  pager:
    tab === 'favorites'
      ? agent.Articles.favoritedBy(username, limit)
      : agent.Articles.byAuthor(username, limit),
  limit,
});
