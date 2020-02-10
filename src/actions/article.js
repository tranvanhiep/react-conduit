import http from '../http';
import { fulfilHandler, rejectHandler } from '../utils';

export const LOAD_ARTICLE_PAGE = 'LOAD_ARTICLE_PAGE';
export const LOAD_ARTICLE_PAGE_SUCCESS = 'LOAD_ARTICLE_PAGE_SUCCESS';
export const LOAD_ARTICLE_PAGE_FAILURE = 'LOAD_ARTICLE_PAGE_FAILURE';
export const RESET_ARTICLE_PAGE = 'RESET_ARTICLE_PAGE';

export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const FAVORITE = 'FAVORITE';
export const FAVORITE_SUCCESS = 'FAVORITE_SUCCESS';
export const FAVORITE_FAILURE = 'FAVORITE_FAILURE';

export const UNFAVORITE = 'UNFAVORITE';
export const UNFAVORITE_SUCCESS = 'UNFAVORITE_SUCCESS';
export const UNFAVORITE_FAILURE = 'UNFAVORITE_FAILURE';

export const FOLLOW_PROFILE = 'FOLLOW_PROFILE';
export const FOLLOW_PROFILE_SUCCESS = 'FOLLOW_PROFILE_SUCCESS';
export const FOLLOW_PROFILE_FAILURE = 'FOLLOW_PROFILE_FAILURE';

export const UNFOLLOW_PROFILE = 'UNFOLLOW_PROFILE';
export const UNFOLLOW_PROFILE_SUCCESS = 'UNFOLLOW_PROFILE_SUCCESS';
export const UNFOLLOW_PROFILE_FAILURE = 'UNFOLLOW_PROFILE_FAILURE';

export const favorite = slug => dispatch => {
  dispatch({ type: FAVORITE });

  return http.Articles.favorite(slug).then(
    fulfilHandler(FAVORITE_SUCCESS, dispatch),
    rejectHandler(FAVORITE_FAILURE, dispatch)
  );
};

export const unfavorite = slug => dispatch => {
  dispatch({ type: UNFAVORITE });

  return http.Articles.unfavorite(slug).then(
    fulfilHandler(UNFAVORITE_SUCCESS, dispatch),
    rejectHandler(UNFAVORITE_FAILURE, dispatch)
  );
};

export const loadArticle = slug => dispatch => {
  dispatch({ type: LOAD_ARTICLE_PAGE });

  return Promise.all([http.Articles.get(slug), http.Comments.get(slug)]).then(
    fulfilHandler(LOAD_ARTICLE_PAGE_SUCCESS, dispatch),
    rejectHandler(LOAD_ARTICLE_PAGE_FAILURE, dispatch)
  );
};

export const unloadArticle = () => ({ type: RESET_ARTICLE_PAGE });

export const deleteComment = (slug, id) => dispatch => {
  dispatch({ type: DELETE_COMMENT });

  return http.Comments.delele(slug, id).then(
    fulfilHandler(DELETE_COMMENT_SUCCESS, dispatch, { id }),
    rejectHandler(DELETE_COMMENT_FAILURE, dispatch)
  );
};

export const addComment = (slug, comment) => dispatch => {
  dispatch({ type: ADD_COMMENT });

  return http.Comments.create(slug, { body: comment }).then(
    fulfilHandler(ADD_COMMENT_SUCCESS, dispatch),
    rejectHandler(ADD_COMMENT_FAILURE, dispatch)
  );
};

export const deleteArticle = slug => dispatch => {
  dispatch({ type: DELETE_ARTICLE });

  return http.Articles.delete(slug).then(
    fulfilHandler(DELETE_ARTICLE_SUCCESS, dispatch),
    rejectHandler(DELETE_ARTICLE_FAILURE, dispatch)
  );
};

export const followProfile = username => dispatch => {
  dispatch({ type: FOLLOW_PROFILE });

  return http.Profiles.follow(username).then(
    fulfilHandler(FOLLOW_PROFILE_SUCCESS, dispatch),
    rejectHandler(FOLLOW_PROFILE_FAILURE, dispatch)
  );
};

export const unfollowProfile = username => dispatch => {
  dispatch({ type: UNFOLLOW_PROFILE });

  return http.Profiles.unfollow(username).then(
    fulfilHandler(UNFOLLOW_PROFILE_SUCCESS, dispatch),
    rejectHandler(UNFOLLOW_PROFILE_FAILURE, dispatch)
  );
};
