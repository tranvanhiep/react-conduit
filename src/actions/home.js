import agent from '../agent';
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionTypes';

export const loadHomePage = (tab, limit) => ({
  type: HOME_PAGE_LOADED,
  payload: Promise.all([
    agent.Tags.getAll(),
    tab === 'feed' ? agent.Articles.feed(limit)(0) : agent.Articles.all(limit)(0),
  ]),
  tab: tab,
  pager: tab === 'feed' ? agent.Articles.feed(limit) : agent.Articles.all(limit),
  limit,
});

export const unloadHomePage = () => ({ type: HOME_PAGE_UNLOADED });
