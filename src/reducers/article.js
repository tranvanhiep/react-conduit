import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
  FOLLOW,
  UNFOLLOW,
  FAVORITE,
  UNFAVORITE,
  DELETE_COMMENT,
  ADD_COMMENT,
} from '../constants/actionTypes';
import { ARTICLE_PAGE } from '../constants';

const initialState = {
  article: null,
  comments: [],
  commentErrors: null,
};
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ARTICLE_PAGE_LOADED: {
      const { article } = payload[0];
      const { comments } = payload[1];
      return {
        ...state,
        article,
        comments,
      };
    }
    case ARTICLE_PAGE_UNLOADED:
      return initialState;
    case FAVORITE:
    case UNFAVORITE: {
      const { from } = action;
      if (from === ARTICLE_PAGE) {
        const { article } = payload;
        return {
          ...state,
          article,
        };
      }
      return state;
    }
    case FOLLOW:
    case UNFOLLOW: {
      const { pageName } = action;
      if (pageName === ARTICLE_PAGE) {
        const { profile } = payload;
        return {
          ...state,
          article: {
            ...state.article,
            author: profile,
          },
        };
      }
      return state;
    }
    case DELETE_COMMENT: {
      const { id } = action;
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== id),
      };
    }
    case ADD_COMMENT: {
      const { comment, errors } = payload;
      const { hasError } = action;
      const comments = [...state.comments];
      comments.unshift(comment);
      return {
        ...state,
        commentErrors: hasError ? errors : null,
        comments,
      };
    }
    default:
      return state;
  }
};
