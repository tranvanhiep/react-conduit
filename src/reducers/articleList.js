import {
  FAVORITE_ARTICLE_SUCCESS,
  UNFAVORITE_ARTICLE_SUCCESS,
  FAVORITE_ARTICLE,
  UNFAVORITE_ARTICLE,
  FAVORITE_ARTICLE_FAILURE,
  UNFAVORITE_ARTICLE_FAILURE,
  LOAD_ARTICLE_LIST,
  LOAD_ARTICLE_LIST_SUCCESS,
  LOAD_ARTICLE_LIST_FAILURE,
  RESET_ARTICLE_LIST,
} from '../actions';
import produce from 'immer';

const initialState = {
  loading: false,
  articles: null,
  articlesCount: 0,
  errors: null,
  favoriting: false,
};

const reducer = produce((draftState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case LOAD_ARTICLE_LIST:
      draftState.loading = true;
      draftState.errors = null;
      break;
    case LOAD_ARTICLE_LIST_SUCCESS: {
      const { articles, articlesCount } = payload;
      draftState.articles = articles;
      draftState.articlesCount = articlesCount;
      draftState.loading = false;
      break;
    }
    case LOAD_ARTICLE_LIST_FAILURE:
      draftState.loading = false;
      draftState.errors = errors;
      break;
    case FAVORITE_ARTICLE:
    case UNFAVORITE_ARTICLE: {
      draftState.favoriting = true;
      break;
    }
    case FAVORITE_ARTICLE_FAILURE:
    case UNFAVORITE_ARTICLE_FAILURE: {
      draftState.favoriting = false;
      break;
    }
    case FAVORITE_ARTICLE_SUCCESS:
    case UNFAVORITE_ARTICLE_SUCCESS: {
      const {
        article: { slug, favorited, favoritesCount },
      } = payload;
      const article = draftState.articles.find(
        article => article.slug === slug
      );
      draftState.favoriting = false;
      article.favorited = favorited;
      article.favoritesCount = favoritesCount;
      break;
    }
    case RESET_ARTICLE_LIST:
      draftState = initialState;
      break;
    default:
      break;
  }
});

export default (state = initialState, action) => reducer(state, action);
