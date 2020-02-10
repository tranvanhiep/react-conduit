import {
  RESET_EDITOR_PAGE,
  UPDATE_ARTICLE_FAILURE,
  CREATE_ARTICLE_FAILURE,
  UPDATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  LOAD_EDITOR_PAGE_SUCCESS,
  LOAD_EDITOR_PAGE,
  LOAD_EDITOR_PAGE_FAILURE,
} from '../actions';

const initialState = {
  article: {
    title: '',
    description: '',
    body: '',
    tagList: [],
  },
  inProgress: false,
  errors: null,
  loaded: false,
};

export default (state = initialState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case UPDATE_ARTICLE:
    case CREATE_ARTICLE:
      return {
        ...state,
        inProgress: true,
      };
    case UPDATE_ARTICLE_FAILURE:
    case CREATE_ARTICLE_FAILURE:
      return {
        ...state,
        errors,
        inProgress: false,
      };
    case UPDATE_ARTICLE_SUCCESS:
    case CREATE_ARTICLE_SUCCESS: {
      const { article } = payload;
      return {
        ...state,
        inProgress: false,
        errors: null,
        article,
      };
    }
    case LOAD_EDITOR_PAGE:
      return {
        ...state,
        inProgress: true,
      };
    case LOAD_EDITOR_PAGE_FAILURE:
      return {
        ...state,
        inProgress: false,
        errors,
      };
    case LOAD_EDITOR_PAGE_SUCCESS: {
      const { article } = payload;
      return {
        ...state,
        article,
        loaded: true,
        inProgress: false,
        errors: null,
      };
    }
    case RESET_EDITOR_PAGE:
      return initialState;
    default:
      return state;
  }
};
