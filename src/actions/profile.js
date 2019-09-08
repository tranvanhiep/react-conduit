import agent from '../agent';
import { FOLLOW, UNFOLLOW } from '../constants/actionTypes';

export const follow = username => ({
  type: FOLLOW,
  payload: agent.Profiles.follow(username),
});

export const unfollow = username => ({
  type: UNFOLLOW,
  payload: agent.Profiles.unfollow(username),
});
