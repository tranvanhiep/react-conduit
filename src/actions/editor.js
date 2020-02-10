import http from '../http';
import { fulfilHandler, rejectHandler } from '../utils';

export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';

export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE';

export const LOAD_EDITOR_PAGE = 'LOAD_EDITOR_PAGE';
export const LOAD_EDITOR_PAGE_SUCCESS = 'LOAD_EDITOR_PAGE_SUCCESS';
export const LOAD_EDITOR_PAGE_FAILURE = 'LOAD_EDITOR_PAGE_FAILURE';
export const RESET_EDITOR_PAGE = 'RESET_EDITOR_PAGE';

export const unloadEditor = () => ({
  type: RESET_EDITOR_PAGE,
});

export const loadEditor = slug => dispatch => {
  dispatch({ type: LOAD_EDITOR_PAGE });

  return http.Articles.get(slug).then(
    fulfilHandler(LOAD_EDITOR_PAGE_SUCCESS, dispatch),
    rejectHandler(LOAD_EDITOR_PAGE_FAILURE, dispatch)
  );
};

export const createArticle = article => dispatch => {
  dispatch({ type: CREATE_ARTICLE });

  return http.Articles.create(article).then(
    fulfilHandler(CREATE_ARTICLE_SUCCESS, dispatch),
    rejectHandler(CREATE_ARTICLE_FAILURE, dispatch)
  );
};

export const updateArticle = article => dispatch => {
  dispatch({ type: UPDATE_ARTICLE });

  return http.Articles.update(article).then(
    fulfilHandler(UPDATE_ARTICLE_SUCCESS, dispatch),
    rejectHandler(UPDATE_ARTICLE_FAILURE, dispatch)
  );
};
