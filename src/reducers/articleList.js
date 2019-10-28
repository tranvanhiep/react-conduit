import {
  HOME_PAGE_UNLOADED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  CHANGE_TAB_PROFILE,
  FAVORITE_ARTICLE_SUCCESS,
  UNFAVORITE_ARTICLE_SUCCESS,
  FAVORITE_ARTICLE_REQUEST,
  UNFAVORITE_ARTICLE_REQUEST,
  FAVORITE_ARTICLE_FAILURE,
  UNFAVORITE_ARTICLE_FAILURE,
  HOME_PAGE_LOAD_SUCCEEDED,
  HOME_PAGE_LOADING,
  HOME_PAGE_LOAD_FAILED,
  TAB_CHANGE_SUCCEEDED,
  TAB_CHANGING,
  TAB_CHANGE_FAILED,
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  articleLoading: false,
  articles: null,
  articlesCount: 0,
  tab: null,
  pager: null,
  tags: null,
  tag: null,
  currentPage: 0,
  limit: 0,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case HOME_PAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HOME_PAGE_LOAD_FAILED:
      return {
        ...state,
        loading: false,
        errors,
      };
    case HOME_PAGE_LOAD_SUCCEEDED: {
      const { tab, pager, limit } = action;
      const { tags } = payload[0];
      const { articles, articlesCount } = payload[1];
      return {
        ...state,
        tags,
        articles,
        articlesCount,
        tab,
        pager,
        currentPage: 1,
        limit,
        loading: false,
        errors: null,
      };
    }
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
      return initialState;
    case TAB_CHANGING:
      return {
        ...state,
        articleLoading: true,
      };
    case TAB_CHANGE_FAILED:
      return {
        ...state,
        articleLoading: false,
        errors,
      };
    case TAB_CHANGE_SUCCEEDED: {
      const { tab, pager, limit } = action;
      const { articles, articlesCount } = payload;
      return {
        ...state,
        articles,
        articlesCount,
        tab,
        pager,
        tag: null,
        currentPage: 1,
        limit,
        articleLoading: false,
        errors: null,
      };
    }
    case SET_PAGE: {
      const { currentPage } = action;
      const { articles, articlesCount } = payload;
      return {
        ...state,
        articles,
        articlesCount,
        currentPage,
      };
    }
    case FAVORITE_ARTICLE_REQUEST:
    case UNFAVORITE_ARTICLE_REQUEST: {
      const { slug } = action;
      return {
        ...state,
        articles: filterAssign(slug, state.articles, { favoriteRequesting: true }),
      };
    }
    case FAVORITE_ARTICLE_FAILURE:
    case UNFAVORITE_ARTICLE_FAILURE: {
      const { slug } = action;
      return {
        ...state,
        articles: filterAssign(slug, state.articles, { favoriteRequesting: false }),
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
    case APPLY_TAG_FILTER: {
      const { pager, tag, limit } = action;
      const { articles, articlesCount } = payload;
      return {
        ...state,
        articles,
        articlesCount,
        pager,
        currentPage: 1,
        tag,
        tab: null,
        limit,
      };
    }
    case PROFILE_PAGE_LOADED: {
      const { articles, articlesCount } = payload[1];
      const { pager, limit } = action;
      return {
        ...state,
        articles,
        articlesCount,
        pager,
        currentPage: 1,
        limit,
      };
    }
    case CHANGE_TAB_PROFILE: {
      const { articles, articlesCount } = payload;
      const { pager, limit } = action;
      return {
        ...state,
        articles,
        articlesCount,
        pager,
        currentPage: 1,
        limit,
      };
    }
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
