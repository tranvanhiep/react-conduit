import agent from '../agent';
import {
  EDITOR_PAGE_UNLOADED,
  EDITOR_PAGE_LOADING,
  EDITOR_PAGE_LOAD_FAILED,
  EDITOR_PAGE_LOAD_SUCCEEDED,
} from '../constants/actionTypes';
import { fulfilHandler, rejectHandler } from '../utils';

export const unloadEditor = () => ({
  type: EDITOR_PAGE_UNLOADED,
});

export const loadEditor = slug => dispatch => {
  dispatch({ type: EDITOR_PAGE_LOADING });

  return agent.Articles.get(slug).then(
    fulfilHandler(EDITOR_PAGE_LOAD_SUCCEEDED, dispatch),
    rejectHandler(EDITOR_PAGE_LOAD_FAILED, dispatch)
  );
};
