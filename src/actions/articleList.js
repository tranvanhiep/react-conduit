import agent from '../agent';
import {
  SET_PAGE,
  FAVORITE_ARTICLE_REQUEST,
  FAVORITE_ARTICLE_SUCCESS,
  FAVORITE_ARTICLE_FAILURE,
  UNFAVORITE_ARTICLE_REQUEST,
  UNFAVORITE_ARTICLE_SUCCESS,
  UNFAVORITE_ARTICLE_FAILURE,
  TAB_CHANGING,
  TAB_CHANGE_SUCCEEDED,
  TAB_CHANGE_FAILED,
  SET_PAGE_SUCCEEDED,
  SET_PAGE_FAILED,
  TAG_FILTERING,
  TAG_FILTER_SUCCEEDED,
  TAG_FILTER_FAILED,
  AUTHOR_ARTICLE_LOADING,
  AUTHOR_ARTICLE_LOAD_SUCCEEDED,
  AUTHOR_ARTICLE_LOAD_FAILED,
  RESET_ARTICLE_LIST,
} from '../constants/actionTypes';
import { fulfilHandler, rejectHandler } from '../utils';

export const changeTab = (tab, limit) => dispatch => {
  const pager = tab === 'feed' ? agent.Articles.feed(limit) : agent.Articles.all(limit);
  dispatch({ type: TAB_CHANGING });

  const articleList = tab === 'feed' ? agent.Articles.feed(limit)(0) : agent.Articles.all(limit)(0);
  return articleList.then(
    fulfilHandler(TAB_CHANGE_SUCCEEDED, dispatch, { pager, tab, limit }),
    rejectHandler(TAB_CHANGE_FAILED, dispatch)
  );
};

export const setPage = (page, pager) => dispatch => {
  dispatch({ type: SET_PAGE });

  return pager(page).then(
    fulfilHandler(SET_PAGE_SUCCEEDED, dispatch, { currentPage: page + 1 }),
    rejectHandler(SET_PAGE_FAILED, dispatch)
  );
};

export const setTagFilter = (tag, pager, limit) => dispatch => {
  dispatch({ type: TAG_FILTERING });

  return pager(tag, limit)(0).then(
    fulfilHandler(TAG_FILTER_SUCCEEDED, dispatch, { pager: pager(tag, limit), tag, limit }),
    rejectHandler(TAG_FILTER_FAILED, dispatch)
  );
};

export const loadAuthorArticle = (tab, username, limit) => dispatch => {
  dispatch({ type: AUTHOR_ARTICLE_LOADING });
  const pager =
    tab === 'favorites'
      ? agent.Articles.favoritedBy(username, limit)
      : agent.Articles.byAuthor(username, limit);

  return pager(0).then(
    fulfilHandler(AUTHOR_ARTICLE_LOAD_SUCCEEDED, dispatch, { pager, limit }),
    rejectHandler(AUTHOR_ARTICLE_LOAD_FAILED, dispatch)
  );
};

export const favoriteArticle = slug => dispatch => {
  dispatch({ type: FAVORITE_ARTICLE_REQUEST, slug });

  return agent.Articles.favorite(slug).then(
    fulfilHandler(FAVORITE_ARTICLE_SUCCESS, dispatch),
    rejectHandler(FAVORITE_ARTICLE_FAILURE, dispatch, { slug })
  );
};

export const unfavoriteArticle = slug => dispatch => {
  dispatch({ type: UNFAVORITE_ARTICLE_REQUEST });

  return agent.Articles.unfavorite(slug).then(
    fulfilHandler(UNFAVORITE_ARTICLE_SUCCESS, dispatch),
    rejectHandler(UNFAVORITE_ARTICLE_FAILURE, dispatch)
  );
};

export const resetArticleList = () => ({ type: RESET_ARTICLE_LIST });
