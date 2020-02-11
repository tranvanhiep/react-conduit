import {
  RESET_ARTICLE_PAGE,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  FAVORITE_SUCCESS,
  UNFAVORITE_SUCCESS,
  FOLLOW_PROFILE_SUCCESS,
  UNFOLLOW_PROFILE_SUCCESS,
  FOLLOW_PROFILE,
  FAVORITE,
  UNFAVORITE,
  FAVORITE_FAILURE,
  UNFAVORITE_FAILURE,
  FOLLOW_PROFILE_FAILURE,
  UNFOLLOW_PROFILE,
  UNFOLLOW_PROFILE_FAILURE,
  DELETE_ARTICLE,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  DELETE_COMMENT,
  ADD_COMMENT,
  LOAD_ARTICLE_PAGE_SUCCESS,
  LOAD_ARTICLE_PAGE,
  LOAD_ARTICLE_PAGE_FAILURE,
} from '../actions';
import produce from 'immer';

const initialState = {
  loading: true,
  article: null,
  comments: [],
  commentErrors: null,
  commentDeleting: false,
  commentSubmitting: false,
  following: false,
  favoriting: false,
  articleDeleting: false,
  errors: null,
};
const reducer = produce((draftState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case LOAD_ARTICLE_PAGE:
      draftState.loading = true;
      draftState.errors = null;
      break;
    case LOAD_ARTICLE_PAGE_FAILURE:
      draftState.loading = false;
      draftState.errors = errors;
      break;
    case LOAD_ARTICLE_PAGE_SUCCESS: {
      const { article } = payload[0];
      const { comments } = payload[1];
      draftState.article = article;
      draftState.comments = comments;
      draftState.loading = false;
      break;
    }
    case RESET_ARTICLE_PAGE:
      draftState = initialState;
      break;
    case FAVORITE:
    case UNFAVORITE:
      draftState.favoriting = true;
      break;
    case FAVORITE_FAILURE:
    case UNFAVORITE_FAILURE:
      draftState.favoriting = false;
      break;
    case FAVORITE_SUCCESS:
    case UNFAVORITE_SUCCESS: {
      const { article } = payload;
      draftState.favoriting = false;
      draftState.article = article;
      break;
    }
    case FOLLOW_PROFILE:
    case UNFOLLOW_PROFILE:
      draftState.following = true;
      break;
    case FOLLOW_PROFILE_FAILURE:
    case UNFOLLOW_PROFILE_FAILURE:
      draftState.following = false;
      break;
    case FOLLOW_PROFILE_SUCCESS:
    case UNFOLLOW_PROFILE_SUCCESS: {
      const { profile } = payload;
      draftState.following = false;
      draftState.article.author = profile;
      break;
    }
    case DELETE_ARTICLE:
      draftState.articleDeleting = true;
      draftState.errors = null;
      break;
    case DELETE_ARTICLE_SUCCESS:
      draftState.articleDeleting = false;
      break;
    case DELETE_ARTICLE_FAILURE:
      draftState.articleDeleting = false;
      draftState.errors = errors;
      break;
    case DELETE_COMMENT:
      draftState.commentDeleting = true;
      draftState.commentErrors = null;
      break;
    case DELETE_COMMENT_FAILURE:
      draftState.commentDeleting = false;
      draftState.commentErrors = errors;
      break;
    case DELETE_COMMENT_SUCCESS: {
      const { id } = action;
      draftState.commentDeleting = false;
      draftState.comments = draftState.comments.filter(
        comment => comment.id !== id
      );
      break;
    }
    case ADD_COMMENT:
      draftState.commentSubmitting = true;
      draftState.commentErrors = null;
      break;
    case ADD_COMMENT_FAILURE:
      draftState.commentSubmitting = false;
      draftState.commentErrors = errors;
      break;
    case ADD_COMMENT_SUCCESS:
      {
        const { comment } = payload;
        draftState.commentSubmitting = false;
        draftState.comments.unshift(comment);
      }
      break;
    default:
      break;
  }
});

export default (state = initialState, action) => reducer(state, action);
