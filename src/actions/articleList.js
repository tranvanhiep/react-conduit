import http from '../http';
import { fulfilHandler, rejectHandler } from '../utils';

export const FAVORITE_ARTICLE = 'FAVORITE_ARTICLE';
export const FAVORITE_ARTICLE_SUCCESS = 'FAVORITE_ARTICLE_SUCCESS';
export const FAVORITE_ARTICLE_FAILURE = 'FAVORITE_ARTICLE_FAILURE';

export const UNFAVORITE_ARTICLE = 'UNFAVORITE_ARTICLE';
export const UNFAVORITE_ARTICLE_SUCCESS = 'UNFAVORITE_ARTICLE_SUCCESS';
export const UNFAVORITE_ARTICLE_FAILURE = 'UNFAVORITE_ARTICLE_FAILURE';

export const LOAD_ARTICLE_LIST = 'LOAD_ARTICLE_LIST';
export const LOAD_ARTICLE_LIST_SUCCESS = 'LOAD_ARTICLE_LIST_SUCCESS';
export const LOAD_ARTICLE_LIST_FAILURE = 'LOAD_ARTICLE_LIST_FAILURE';
export const RESET_ARTICLE_LIST = 'RESET_ARTICLE_LIST';

export const loadArticles = config => dispatch => {
  dispatch({ type: LOAD_ARTICLE_LIST });
  return http.Articles.getArticles(config).then(
    fulfilHandler(LOAD_ARTICLE_LIST_SUCCESS, dispatch),
    rejectHandler(LOAD_ARTICLE_LIST_FAILURE, dispatch)
  );
};

export const unloadArticles = () => ({ type: RESET_ARTICLE_LIST });

export const favoriteArticle = slug => dispatch => {
  dispatch({ type: FAVORITE_ARTICLE, slug });

  return http.Articles.favorite(slug).then(
    fulfilHandler(FAVORITE_ARTICLE_SUCCESS, dispatch),
    rejectHandler(FAVORITE_ARTICLE_FAILURE, dispatch, { slug })
  );
};

export const unfavoriteArticle = slug => dispatch => {
  dispatch({ type: UNFAVORITE_ARTICLE });

  return http.Articles.unfavorite(slug).then(
    fulfilHandler(UNFAVORITE_ARTICLE_SUCCESS, dispatch),
    rejectHandler(UNFAVORITE_ARTICLE_FAILURE, dispatch)
  );
};
