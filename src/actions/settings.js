import agent from '../agent';
import {
  SETTINGS_PAGE_LOADED,
  SETTINGS_PAGE_UNLOADED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../constants/actionTypes';
import { fulfilHandler, rejectHandler } from '../utils';

export const loadSettings = () => ({
  type: SETTINGS_PAGE_LOADED,
});

export const unloadSettings = () => ({
  type: SETTINGS_PAGE_UNLOADED,
});

export const updateUser = user => dispatch => {
  dispatch({ type: UPDATE_USER_REQUEST });

  return agent.Auth.update(user).then(
    fulfilHandler(UPDATE_USER_SUCCESS, dispatch),
    rejectHandler(UPDATE_USER_FAILURE, dispatch)
  );
};
