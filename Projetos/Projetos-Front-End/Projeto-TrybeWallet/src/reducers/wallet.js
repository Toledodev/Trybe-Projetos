// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { PICKUP_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  curriencies: [],
};

function expensesUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PICKUP_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
}

export default expensesUser;
