import { GET_PLAYER_DATA, GET_SCORE } from '../actions/index';

const INITIAL_STATE = {
  player: [],
  score: 0,
};

const playerDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_PLAYER_DATA:
    return {
      ...state,
      player: action.payload,
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default playerDataReducer;
