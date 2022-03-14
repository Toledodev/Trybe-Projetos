import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getDataFromApi } from '../actions';

class FormsWallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      coins: [],
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderExpenses = this.renderExpenses.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderCurrency = this.renderCurrency.bind(this);
    this.renderPayment = this.renderPayment.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.getCoins = this.getCoins.bind(this);
  }

  componentDidMount() {
    this.getCoins();
  }

  getCoins() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((quotes) => {
        const coins = Object.keys(quotes);
        coins.splice(1, 1);
        this.setState({ coins });
      });
  }

  handleInputs({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { expensesApplication, saveExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const statesExpense = {
      id: expensesApplication.length,
      value,
      description,
      currency,
      method,
      tag,
    };
    saveExpense(statesExpense);
    const forms = document.getElementById('form');
    forms.reset();
  }

  renderExpenses() {
    return (
      <label htmlFor="value">
        Valor despesa:
        <input
          data-testid="value-input"
          name="value"
          type="text"
          onChange={ this.handleInputs }
        />
      </label>
    );
  }

  renderDescription() {
    return (
      <label htmlFor="description">
        Descrição despesa:
        <input
          data-testid="description-input"
          name="description"
          type="text"
          onChange={ this.handleInputs }
        />
      </label>
    );
  }

  renderCurrency() {
    const { coins } = this.state;
    return (
      <label htmlFor="currency">
        Moeda
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
          onChange={ this.handleInputs }
        >
          {
            coins.length === 0 ? null : (
              coins.map((current) => (
                <option key={ current } data-testid={ current }>{ current }</option>))
            )
          }
        </select>
      </label>
    );
  }

  renderPayment() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleInputs }
          value={ method }
          id="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag() {
    return (
      <label htmlFor="tag">
        Tag
        <select
          type="number"
          name="tag"
          data-testid="tag-input"
          onChange={ this.handleInputs }
          id="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        <form id="form">
          {this.renderExpenses()}
          {this.renderDescription()}
          {this.renderCurrency()}
          {this.renderPayment()}
          {this.renderTag()}
          <button
            type="button"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </form>
      </div>

    );
  }
}

FormsWallet.propTypes = {
  expensesApplication: PropTypes.shape({
    length: PropTypes.number,
  }).isRequired,
  saveExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (state) => dispatch(getDataFromApi(state)),
});

const mapStateToProps = (state) => ({
  expensesApplication: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormsWallet);
