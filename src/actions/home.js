import agent from '../agent';
import {
  HOME_PAGE_UNLOADED,
  HOME_PAGE_LOADING,
  HOME_PAGE_LOAD_SUCCEEDED,
  HOME_PAGE_LOAD_FAILED,
} from '../constants/actionTypes';
import { fulfilHandler, rejectHandler } from '../utils';

export const loadHomePage = (tab, limit) => dispatch => {
  const pager = tab === 'feed' ? agent.Articles.feed(limit) : agent.Articles.all(limit);
  dispatch({ type: HOME_PAGE_LOADING });

  return Promise.all([
    agent.Tags.getAll(),
    tab === 'feed' ? agent.Articles.feed(limit)(0) : agent.Articles.all(limit)(0),
  ]).then(
    fulfilHandler(HOME_PAGE_LOAD_SUCCEEDED, dispatch, { tab, pager, limit }),
    rejectHandler(HOME_PAGE_LOAD_FAILED, dispatch)
  );
};

export const unloadHomePage = () => ({ type: HOME_PAGE_UNLOADED });
