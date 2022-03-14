// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default user;
