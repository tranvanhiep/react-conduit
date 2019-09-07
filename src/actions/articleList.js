import agent from '../agent';
import { CHANGE_TAB, SET_PAGE, APPLY_TAG_FILTER } from '../constants/actionTypes';

export const changeTab = tab => ({
  type: CHANGE_TAB,
  payload: tab === 'feed' ? agent.Articles.feed(0) : agent.Articles.all(0),
  pager: tab === 'feed' ? agent.Articles.feed : agent.Articles.all,
  tab,
});

export const setPage = (page, pager) => ({
  type: SET_PAGE,
  payload: pager(page),
  currentPage: page + 1,
});

export const setTagFilter = (tag, pager) => ({
  type: APPLY_TAG_FILTER,
  payload: pager(tag, 0),
  pager,
  tag,
});
