import agent from '../agent';
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionTypes';

export const loadHomePage = tab => ({
  type: HOME_PAGE_LOADED,
  payload: Promise.all([
    agent.Tags.getAll(),
    tab === 'feed' ? agent.Articles.feed(0) : agent.Articles.all(0),
  ]),
  tab: tab,
  pager: tab === 'feed' ? agent.Articles.feed : agent.Articles.all,
});

export const unloadHomePage = () => ({ type: HOME_PAGE_UNLOADED });
