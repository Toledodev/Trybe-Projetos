export const GET_TOKEN = 'GET_TOKEN';
export const GET_PLAYER_DATA = 'GET_PLAYER_DATA';
export const GET_SCORE = 'GET_SCORE';

export const player = (payload) => ({
  type: GET_PLAYER_DATA,
  payload,
});

export const token = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const playerScore = (payload) => ({
  type: GET_SCORE,
  payload,
});

const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = () => async (dispatch) => {
  const response = await fetch(URL_TOKEN);
  const data = await response.json();
  return dispatch(token(data));
};
