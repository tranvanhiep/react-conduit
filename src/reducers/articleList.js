import {
  HOME_PAGE_UNLOADED,
  SET_PAGE,
  PROFILE_PAGE_UNLOADED,
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
  SET_PAGE_SUCCEEDED,
  SET_PAGE_FAILED,
  TAG_FILTER_SUCCEEDED,
  TAG_FILTERING,
  TAG_FILTER_FAILED,
  AUTHOR_ARTICLE_LOAD_SUCCEEDED,
  AUTHOR_ARTICLE_LOADING,
  AUTHOR_ARTICLE_LOAD_FAILED,
  RESET_ARTICLE_LIST,
} from '../constants/actionTypes';

const initialState = {
  loading: true,
  articleLoading: true,
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
        articleLoading: false,
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
        articleLoading: false,
        errors: null,
      };
    }
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
      return initialState;
    case AUTHOR_ARTICLE_LOADING:
    case TAB_CHANGING:
      return {
        ...state,
        articleLoading: true,
      };
    case AUTHOR_ARTICLE_LOAD_FAILED:
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
    case AUTHOR_ARTICLE_LOAD_SUCCEEDED: {
      const { articles, articlesCount } = payload;
      const { pager, limit } = action;
      return {
        ...state,
        articles,
        articlesCount,
        pager,
        currentPage: 1,
        limit,
        articleLoading: false,
        loading: false,
      };
    }
    case SET_PAGE:
      return {
        ...state,
        articleLoading: true,
      };
    case SET_PAGE_FAILED:
      return {
        ...state,
        articleLoading: false,
        errors,
      };
    case SET_PAGE_SUCCEEDED: {
      const { currentPage } = action;
      const { articles, articlesCount } = payload;
      return {
        ...state,
        articles,
        articlesCount,
        currentPage,
        articleLoading: false,
        errors: null,
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
    case TAG_FILTERING:
      return {
        ...state,
        articleLoading: true,
      };
    case TAG_FILTER_FAILED:
      return {
        ...state,
        articleLoading: false,
        errors,
      };
    case TAG_FILTER_SUCCEEDED: {
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
        articleLoading: false,
        errors: null,
      };
    }
    case RESET_ARTICLE_LIST:
      return {
        ...state,
        articles: null,
      };
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
