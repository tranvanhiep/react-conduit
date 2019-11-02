import {
  EDITOR_PAGE_UNLOADED,
  UPDATE_ARTICLE_FAILURE,
  CREATE_ARTICLE_FAILURE,
  UPDATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_REQUEST,
  EDITOR_PAGE_LOAD_SUCCEEDED,
  EDITOR_PAGE_LOADING,
  EDITOR_PAGE_LOAD_FAILED,
} from '../constants/actionTypes';

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
    case UPDATE_ARTICLE_REQUEST:
    case CREATE_ARTICLE_REQUEST:
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
    case EDITOR_PAGE_LOADING:
      return {
        ...state,
        inProgress: true,
      };
    case EDITOR_PAGE_LOAD_FAILED:
      return {
        ...state,
        inProgress: false,
        errors,
      };
    case EDITOR_PAGE_LOAD_SUCCEEDED: {
      const { article } = payload;
      return {
        ...state,
        article,
        loaded: true,
        inProgress: false,
        errors: null,
      };
    }
    case EDITOR_PAGE_UNLOADED:
      return initialState;
    default:
      return state;
  }
};
