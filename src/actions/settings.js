import { SETTINGS_PAGE_LOADED, SETTINGS_PAGE_UNLOADED } from '../constants/actionTypes';

export const loadSettings = () => ({
  type: SETTINGS_PAGE_LOADED,
});

export const unloadSettings = () => ({
  type: SETTINGS_PAGE_UNLOADED,
});
