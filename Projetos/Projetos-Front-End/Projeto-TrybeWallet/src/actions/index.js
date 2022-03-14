// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const PICKUP_EXPENSE = 'CATCH_EXPENSE';

export function emailToStore(email) {
  return {
    type: USER_LOGIN,
    payload: {
      email,
    },
  };
}

export function expenseToStore(payload) {
  return {
    type: PICKUP_EXPENSE,
    payload,
  };
}

export function getDataFromApi(data) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((rates) => dispatch(expenseToStore({ ...data, exchangeRates: rates })));
  };
}
