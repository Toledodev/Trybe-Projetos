import React from 'react';

class Checkout extends React.Component {
  render() {
    return (
      <form>
        <label
          htmlFor="checkout-fullname"
        >
          Nome completo:
          <input
            data-testid="checkout-fullname"
            type="text"
            name="checkout-fullname"
            required
          />
        </label>
        <label
          htmlFor="checkout-email"
        >
          Email:
          <input
            data-testid="checkout-email"
            type="email"
            name="checkout-email"
            required
          />
        </label>
        <label
          htmlFor="checkout-cpf"
        >
          CPF:
          <input
            data-testid="checkout-cpf"
            type="text"
            name="checkout-cpf"
            required
          />
        </label>
        <label
          htmlFor="checkout-phone"
        >
          Telefone:
          <input
            data-testid="checkout-phone"
            type="text"
            name="checkout-phone"
            required
          />
        </label>
        <label
          htmlFor="checkout-cep"
        >
          CEP:
          <input
            data-testid="checkout-cep"
            type="text"
            name="checkout-cep"
            required
          />
        </label>
        <label
          htmlFor="checkout-address"
        >
          Endereço:
          <input
            data-testid="checkout-address"
            type="text"
            name="checkout-address"
            required
          />
        </label>
      </form>
    );
  }
}

export default Checkout;
