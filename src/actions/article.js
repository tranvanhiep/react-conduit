import agent from '../agent';
import { FAVORITE, UNFAVORITE } from '../constants/actionTypes';

export const favorite = slug => ({
  type: FAVORITE,
  payload: agent.Articles.favorite(slug),
});

export const unfavorite = slug => ({
  type: UNFAVORITE,
  payload: agent.Articles.unfavorite(slug),
});
