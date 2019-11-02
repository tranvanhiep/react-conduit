import agent from '../agent';
import {
  ARTICLE_PAGE_UNLOADED,
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  FAVORITE_REQUEST,
  FAVORITE_SUCCESS,
  FAVORITE_FAILURE,
  UNFAVORITE_REQUEST,
  UNFAVORITE_SUCCESS,
  UNFAVORITE_FAILURE,
  FOLLOW_PROFILE_REQUEST,
  FOLLOW_PROFILE_SUCCESS,
  FOLLOW_PROFILE_FAILURE,
  UNFOLLOW_PROFILE_REQUEST,
  UNFOLLOW_PROFILE_SUCCESS,
  UNFOLLOW_PROFILE_FAILURE,
  ARTICLE_PAGE_LOADING,
  ARTICLE_PAGE_LOAD_SUCCEEDED,
  ARTICLE_PAGE_LOAD_FAILED,
} from '../constants/actionTypes';
import { fulfilHandler, rejectHandler } from '../utils';

export const favorite = slug => dispatch => {
  dispatch({ type: FAVORITE_REQUEST });

  return agent.Articles.favorite(slug).then(
    fulfilHandler(FAVORITE_SUCCESS, dispatch),
    rejectHandler(FAVORITE_FAILURE, dispatch)
  );
};

export const unfavorite = slug => dispatch => {
  dispatch({ type: UNFAVORITE_REQUEST });

  return agent.Articles.unfavorite(slug).then(
    fulfilHandler(UNFAVORITE_SUCCESS, dispatch),
    rejectHandler(UNFAVORITE_FAILURE, dispatch)
  );
};

export const loadArticle = slug => dispatch => {
  dispatch({ type: ARTICLE_PAGE_LOADING });

  return Promise.all([agent.Articles.get(slug), agent.Comments.get(slug)]).then(
    fulfilHandler(ARTICLE_PAGE_LOAD_SUCCEEDED, dispatch),
    rejectHandler(ARTICLE_PAGE_LOAD_FAILED, dispatch)
  );
};

export const unloadArticle = () => ({ type: ARTICLE_PAGE_UNLOADED });

export const deleteComment = (slug, id) => dispatch => {
  dispatch({ type: DELETE_COMMENT_REQUEST });

  return agent.Comments.delele(slug, id).then(
    fulfilHandler(DELETE_COMMENT_SUCCESS, dispatch),
    rejectHandler(DELETE_COMMENT_FAILURE, dispatch)
  );
};

export const addComment = (slug, comment) => dispatch => {
  dispatch({ type: ADD_COMMENT_REQUEST });

  return agent.Comments.create(slug, { body: comment }).then(
    fulfilHandler(ADD_COMMENT_SUCCESS, dispatch),
    rejectHandler(ADD_COMMENT_FAILURE, dispatch)
  );
};

export const deleteArticle = slug => dispatch => {
  dispatch({ type: DELETE_ARTICLE_REQUEST });

  return agent.Articles.delete(slug).then(
    fulfilHandler(DELETE_ARTICLE_SUCCESS, dispatch),
    rejectHandler(DELETE_ARTICLE_FAILURE, dispatch)
  );
};

export const createArticle = article => dispatch => {
  dispatch({ type: CREATE_ARTICLE_REQUEST });

  return agent.Articles.create(article).then(
    fulfilHandler(CREATE_ARTICLE_SUCCESS, dispatch),
    rejectHandler(CREATE_ARTICLE_FAILURE, dispatch)
  );
};

export const updateArticle = article => dispatch => {
  dispatch({ type: UPDATE_ARTICLE_REQUEST });

  return agent.Articles.update(article).then(
    fulfilHandler(UPDATE_ARTICLE_SUCCESS, dispatch),
    rejectHandler(UPDATE_ARTICLE_FAILURE, dispatch)
  );
};

export const followProfile = username => dispatch => {
  dispatch({ type: FOLLOW_PROFILE_REQUEST });

  return agent.Profiles.follow(username).then(
    fulfilHandler(FOLLOW_PROFILE_SUCCESS, dispatch),
    rejectHandler(FOLLOW_PROFILE_FAILURE, dispatch)
  );
};

export const unfollowProfile = username => dispatch => {
  dispatch({ type: UNFOLLOW_PROFILE_REQUEST });

  return agent.Profiles.unfollow(username).then(
    fulfilHandler(UNFOLLOW_PROFILE_SUCCESS, dispatch),
    rejectHandler(UNFOLLOW_PROFILE_FAILURE, dispatch)
  );
};
