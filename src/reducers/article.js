import {
  ARTICLE_PAGE_UNLOADED,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  FAVORITE_SUCCESS,
  UNFAVORITE_SUCCESS,
  FOLLOW_PROFILE_SUCCESS,
  UNFOLLOW_PROFILE_SUCCESS,
  FOLLOW_PROFILE_REQUEST,
  FAVORITE_REQUEST,
  UNFAVORITE_REQUEST,
  FAVORITE_FAILURE,
  UNFAVORITE_FAILURE,
  FOLLOW_PROFILE_FAILURE,
  UNFOLLOW_PROFILE_REQUEST,
  UNFOLLOW_PROFILE_FAILURE,
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  DELETE_COMMENT_REQUEST,
  ADD_COMMENT_REQUEST,
  ARTICLE_PAGE_LOAD_SUCCEEDED,
  ARTICLE_PAGE_LOADING,
  ARTICLE_PAGE_LOAD_FAILED,
} from '../constants/actionTypes';

const initialState = {
  loading: true,
  article: null,
  comments: [],
  commentErrors: null,
  commentDeleting: false,
  commentSubmitting: false,
  followRequesting: false,
  favoriteRequesting: false,
  articleDeleting: false,
  errors: null,
};
export default (state = initialState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case ARTICLE_PAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ARTICLE_PAGE_LOAD_FAILED:
      return {
        ...state,
        loading: false,
        errors,
      };
    case ARTICLE_PAGE_LOAD_SUCCEEDED: {
      const { article } = payload[0];
      const { comments } = payload[1];
      return {
        ...state,
        article,
        comments,
        loading: false,
        errors: null,
      };
    }
    case ARTICLE_PAGE_UNLOADED:
      return initialState;
    case FAVORITE_REQUEST:
    case UNFAVORITE_REQUEST:
      return {
        ...state,
        favoriteRequesting: true,
      };
    case FAVORITE_FAILURE:
    case UNFAVORITE_FAILURE:
      return {
        ...state,
        favoriteRequesting: false,
      };
    case FAVORITE_SUCCESS:
    case UNFAVORITE_SUCCESS: {
      const { article } = payload;
      return {
        ...state,
        favoriteRequesting: false,
        article,
      };
    }
    case FOLLOW_PROFILE_REQUEST:
    case UNFOLLOW_PROFILE_REQUEST:
      return {
        ...state,
        followRequesting: true,
      };
    case FOLLOW_PROFILE_FAILURE:
    case UNFOLLOW_PROFILE_FAILURE:
      return {
        ...state,
        followRequesting: false,
      };
    case FOLLOW_PROFILE_SUCCESS:
    case UNFOLLOW_PROFILE_SUCCESS: {
      const { profile } = payload;
      return {
        ...state,
        followRequesting: false,
        article: {
          ...state.article,
          author: profile,
        },
      };
    }
    case DELETE_ARTICLE_REQUEST:
      return {
        ...state,
        articleDeleting: true,
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        articleDeleting: false,
        errors: null,
      };
    case DELETE_ARTICLE_FAILURE:
      return {
        ...state,
        articleDeleting: false,
        errors,
      };
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        commentDeleting: true,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        commentErrors: errors,
        commentDeleting: false,
      };
    case DELETE_COMMENT_SUCCESS: {
      const { id } = action;
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== id),
        commentErrors: null,
        commentDeleting: false,
      };
    }
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        commentSubmitting: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        commentErrors: errors,
        commentSubmitting: false,
      };
    case ADD_COMMENT_SUCCESS: {
      const { comment } = payload;
      const comments = [...state.comments];
      comments.unshift(comment);
      return {
        ...state,
        commentErrors: null,
        commentSubmitting: false,
        comments,
      };
    }
    default:
      return state;
  }
};
