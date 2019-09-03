import agent from '../agent';
import { CHANGE_TAB, SET_PAGE } from '../constants/actionTypes';

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
