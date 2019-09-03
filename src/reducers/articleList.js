import {
  CHANGE_TAB,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  SET_PAGE,
} from '../constants/actionTypes';

const initialState = {
  articles: null,
  articlesCount: 0,
  tab: null,
  pager: null,
  tags: null,
  tag: null,
  currentPage: 0,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case HOME_PAGE_LOADED: {
      const { tab, pager } = action;
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
      };
    }
    case HOME_PAGE_UNLOADED:
      return initialState;
    case CHANGE_TAB: {
      const { tab, pager } = action;
      const { articles, articlesCount } = payload;
      return {
        ...state,
        articles,
        articlesCount,
        tab,
        pager,
        tag: null,
        currentPage: 1,
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
    default:
      return state;
  }
};
