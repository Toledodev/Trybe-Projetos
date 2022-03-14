import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from './Form';
import TableExpenses from './TableExpenses';

class Wallet extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const convertToBrl = expenses.map(
      (expense) => expense.value * Object.entries(expense.exchangeRates).find(
        (currency) => expense.currency === currency[0],
      )[1].ask,
    );
    return (
      <div>
        <header>
          <h3 data-testid="email-field">{email}</h3>
          <h3 data-testid="total-field">
            {
              convertToBrl.reduce((acc, cur) => acc + cur, 0)
            }
          </h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <Form />
        <TableExpenses />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    map: PropTypes.func,
    reduce: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Wallet);
