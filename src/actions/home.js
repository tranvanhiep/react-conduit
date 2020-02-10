import http from '../http';
import { fulfilHandler, rejectHandler } from '../utils';

export const LOAD_HOME_PAGE = 'LOAD_HOME_PAGE';
export const LOAD_HOME_PAGE_SUCCESS = 'LOAD_HOME_PAGE_SUCCESS';
export const LOAD_HOME_PAGE_FAILURE = 'LOAD_HOME_PAGE_FAILURE';
export const RESET_HOME_PAGE = 'RESET_HOME_PAGE';

export const loadHomePage = () => dispatch => {
  return http.Tags.getAll().then(
    fulfilHandler(LOAD_HOME_PAGE_SUCCESS, dispatch),
    rejectHandler(LOAD_HOME_PAGE_FAILURE, dispatch)
  );
};

export const unloadHomePage = () => ({ type: RESET_HOME_PAGE });
