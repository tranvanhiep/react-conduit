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

const initialState = {
  loading: false,
  articles: null,
  articlesCount: 0,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case LOAD_ARTICLE_LIST:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case LOAD_ARTICLE_LIST_SUCCESS: {
      const { articles, articlesCount } = payload;
      return {
        ...state,
        articles,
        articlesCount,
        loading: false,
      };
    }
    case LOAD_ARTICLE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        errors,
      };
    case FAVORITE_ARTICLE:
    case UNFAVORITE_ARTICLE: {
      const { slug } = action;
      return {
        ...state,
        articles: filterAssign(slug, state.articles, {
          favoriteRequesting: true,
        }),
      };
    }
    case FAVORITE_ARTICLE_FAILURE:
    case UNFAVORITE_ARTICLE_FAILURE: {
      const { slug } = action;
      return {
        ...state,
        articles: filterAssign(slug, state.articles, {
          favoriteRequesting: false,
        }),
      };
    }
    case FAVORITE_ARTICLE_SUCCESS:
    case UNFAVORITE_ARTICLE_SUCCESS: {
      const {
        article: { slug, favorited, favoritesCount },
      } = payload;
      return {
        ...state,
        articles: filterAssign(slug, state.articles, {
          favorited,
          favoritesCount,
          favoriteRequesting: false,
        }),
      };
    }
    case RESET_ARTICLE_LIST:
      return initialState;
    default:
      return state;
  }
};

const filterAssign = (slug, articles, rest) =>
  articles.map(article => {
    if (article.slug === slug) {
      return {
        ...article,
        ...rest,
      };
    }
    return article;
  });
