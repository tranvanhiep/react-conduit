import {
  CHANGE_TAB,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  SET_PAGE,
  FAVORITE,
  UNFAVORITE,
  APPLY_TAG_FILTER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  CHANGE_TAB_PROFILE,
} from '../constants/actionTypes';
import { ARTICLE_LIST } from '../constants';

const initialState = {
  articles: null,
  articlesCount: 0,
  tab: null,
  pager: null,
  tags: null,
  tag: null,
  currentPage: 0,
  limit: 0,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case HOME_PAGE_LOADED: {
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
      };
    }
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
      return initialState;
    case CHANGE_TAB: {
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
    case FAVORITE:
    case UNFAVORITE: {
      const { from } = action;
      if (from === ARTICLE_LIST) {
        const {
          article: { slug, favorited, favoritesCount },
        } = payload;
        return {
          ...state,
          articles: state.articles.map(article => {
            if (article.slug === slug) {
              return {
                ...article,
                favorited,
                favoritesCount,
              };
            }
            return article;
          }),
        };
      }
      return state;
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
