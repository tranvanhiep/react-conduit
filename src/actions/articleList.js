import agent from '../agent';
import {
  SET_PAGE,
  APPLY_TAG_FILTER,
  CHANGE_TAB_PROFILE,
  FAVORITE_ARTICLE_REQUEST,
  FAVORITE_ARTICLE_SUCCESS,
  FAVORITE_ARTICLE_FAILURE,
  UNFAVORITE_ARTICLE_REQUEST,
  UNFAVORITE_ARTICLE_SUCCESS,
  UNFAVORITE_ARTICLE_FAILURE,
  TAB_CHANGING,
  TAB_CHANGE_SUCCEEDED,
  TAB_CHANGE_FAILED,
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

export const setPage = (page, pager) => ({
  type: SET_PAGE,
  payload: pager(page),
  currentPage: page + 1,
});

export const setTagFilter = (tag, pager, limit) => ({
  type: APPLY_TAG_FILTER,
  payload: pager(tag, limit)(0),
  pager: pager(tag, limit),
  tag,
  limit,
});

export const changeTabProfile = (tab, username, limit) => ({
  type: CHANGE_TAB_PROFILE,
  payload:
    tab === 'favorites'
      ? agent.Articles.favoritedBy(username, limit)(0)
      : agent.Articles.byAuthor(username, limit)(0),
  pager:
    tab === 'favorites'
      ? agent.Articles.favoritedBy(username, limit)
      : agent.Articles.byAuthor(username, limit),
  limit,
});

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
