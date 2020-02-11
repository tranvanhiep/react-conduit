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
import produce from 'immer';

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

const reducer = produce((draftState, action) => {
  const { type, payload, errors } = action;

  switch (type) {
    case UPDATE_ARTICLE:
    case CREATE_ARTICLE:
      draftState.inProgress = true;
      draftState.errors = null;
      break;
    case UPDATE_ARTICLE_FAILURE:
    case CREATE_ARTICLE_FAILURE:
      draftState.inProgress = false;
      draftState.errors = errors;
      break;
    case UPDATE_ARTICLE_SUCCESS:
    case CREATE_ARTICLE_SUCCESS: {
      const { article } = payload;
      draftState.inProgress = false;
      draftState.article = article;
      break;
    }
    case LOAD_EDITOR_PAGE:
      draftState.inProgress = true;
      draftState.errors = null;
      break;
    case LOAD_EDITOR_PAGE_FAILURE:
      draftState.inProgress = false;
      draftState.errors = errors;
      break;
    case LOAD_EDITOR_PAGE_SUCCESS: {
      const { article } = payload;
      draftState.inProgress = false;
      draftState.article = article;
      draftState.loaded = true;
      break;
    }
    case RESET_EDITOR_PAGE:
      draftState = initialState;
      break;
    default:
      break;
  }
});

export default (state = initialState, action) => reducer(state, action);
