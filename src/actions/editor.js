import agent from '../agent';
import {
  EDITOR_PAGE_UNLOADED,
  EDITOR_PAGE_LOADED,
  UPDATE_FIELD_EDITOR,
} from '../constants/actionTypes';

export const unloadEditor = () => ({
  type: EDITOR_PAGE_UNLOADED,
});

export const loadEditor = slug => ({
  type: EDITOR_PAGE_LOADED,
  payload: agent.Articles.get(slug),
});

export const updateFieldEditor = ({ key, value }) => ({
  type: UPDATE_FIELD_EDITOR,
  payload: { key, value },
});
