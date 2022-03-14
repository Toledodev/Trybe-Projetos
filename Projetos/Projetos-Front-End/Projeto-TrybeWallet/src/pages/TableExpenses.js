import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  constructor() {
    super();

    this.getExchangeRate = this.getExchangeRate.bind(this);
  }

  getExchangeRate({ value, currency, exchangeRates }) { // logica implementada com ajuda do meu querido amigo matheus muniz, da tribo A :)
    const floatValue = Number(value);
    let { ask } = exchangeRates[currency];
    ask = Number(ask);

    let convertCurrency = exchangeRates[currency].name;
    [convertCurrency] = convertCurrency.split('/');

    const converteValue = floatValue * ask;

    return ({
      converteValue: converteValue.toFixed(2),
      exchangeRate: ask.toFixed(2),
      convertCurrency,
    });
  }

  render() {
    const { wallet: { expenses } } = this.props;

    return (
      <table>
        <tr>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Método de pagamento</th>
          <th>Tag</th>
          <th>Descrição</th>
          <th>Câmbio utilizado</th>
          <th>Moeda de conversão</th>
          <th>Valor convertido</th>
          <th>Editar/Excluir</th>
        </tr>
        {
          expenses.map((expense, index) => (
            <tr key={ index }>
              <td>{expense.value}</td>
              <td>{expense.currency}</td>
              <td>{expense.method}</td>
              <td>{expense.tag}</td>
              <td>{expense.description}</td>
              <td>{this.getExchangeRate(expense).exchangeRate}</td>
              <td>{this.getExchangeRate(expense).convertCurrency}</td>
              <td>
                {this.getExchangeRate(expense).converteValue}
              </td>
              <td>Real</td>
            </tr>
          ))
        }
      </table>
    );
  }
}
const mapStateToProps = ({ wallet }) => ({ wallet });

Table.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf,
  }).isRequired,
};

export default connect(mapStateToProps)(Table);
