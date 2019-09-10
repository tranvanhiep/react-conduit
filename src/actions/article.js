import agent from '../agent';
import {
  FAVORITE,
  UNFAVORITE,
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
  DELETE_COMMENT,
  ADD_COMMENT,
  DELETE_ARTICLE,
} from '../constants/actionTypes';

export const favorite = (slug, from) => ({
  type: FAVORITE,
  payload: agent.Articles.favorite(slug),
  from,
});

export const unfavorite = (slug, from) => ({
  type: UNFAVORITE,
  payload: agent.Articles.unfavorite(slug),
  from,
});

export const loadArticle = slug => ({
  type: ARTICLE_PAGE_LOADED,
  payload: Promise.all([agent.Articles.get(slug), agent.Comments.get(slug)]),
});

export const unloadArticle = () => ({ type: ARTICLE_PAGE_UNLOADED });

export const deleteComment = (slug, id) => ({
  type: DELETE_COMMENT,
  payload: agent.Comments.delele(slug, id),
  id,
});

export const addComment = (slug, comment) => ({
  type: ADD_COMMENT,
  payload: agent.Comments.create(slug, { body: comment }),
});

export const deleteArticle = slug => ({
  type: DELETE_ARTICLE,
  payload: agent.Articles.delete(slug),
});
