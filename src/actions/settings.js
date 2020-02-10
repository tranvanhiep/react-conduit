import http from '../http';
import { fulfilHandler, rejectHandler } from '../utils';

export const LOAD_SETTINGS_PAGE = 'LOAD_SETTINGS_PAGE';
export const RESET_SETTINGS_PAGE = 'RESET_SETTINGS_PAGE';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const loadSettings = () => ({
  type: LOAD_SETTINGS_PAGE,
});

export const unloadSettings = () => ({
  type: RESET_SETTINGS_PAGE,
});

export const updateUser = user => dispatch => {
  dispatch({ type: UPDATE_USER });

  return http.Auth.update(user).then(
    fulfilHandler(UPDATE_USER_SUCCESS, dispatch),
    rejectHandler(UPDATE_USER_FAILURE, dispatch)
  );
};
