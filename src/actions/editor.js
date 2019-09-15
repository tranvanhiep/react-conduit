import agent from '../agent';
import {
  EDITOR_PAGE_UNLOADED,
  EDITOR_PAGE_LOADED,
} from '../constants/actionTypes';

export const unloadEditor = () => ({
  type: EDITOR_PAGE_UNLOADED,
});

export const loadEditor = slug => ({
  type: EDITOR_PAGE_LOADED,
  payload: agent.Articles.get(slug),
});
