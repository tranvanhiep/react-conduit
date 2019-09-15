import {
  ASYNC_START,
  CREATE_ARTICLE,
  EDITOR_PAGE_UNLOADED,
  EDITOR_PAGE_LOADED,
  UPDATE_FIELD_EDITOR,
  UPDATE_ARTICLE,
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
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_FIELD_EDITOR: {
      const { key, value } = payload;
      return { ...state, article: { ...state.article, [key]: value } };
    }
    case ASYNC_START:
      const { subType } = action;
      if (subType === CREATE_ARTICLE) {
        return {
          ...state,
          inProgress: true,
        };
      }
      return state;
    case UPDATE_ARTICLE:
    case CREATE_ARTICLE: {
      const { hasError } = action;
      if (hasError) {
        const { errors } = payload;
        return {
          ...state,
          errors,
          inProgress: false,
        };
      } else {
        const { article } = payload;
        return {
          ...state,
          inProgress: false,
          article,
        };
      }
    }
    case EDITOR_PAGE_LOADED: {
      const { article } = payload;
      return { ...state, article };
    }
    case EDITOR_PAGE_UNLOADED:
      return initialState;
    default:
      return state;
  }
};
