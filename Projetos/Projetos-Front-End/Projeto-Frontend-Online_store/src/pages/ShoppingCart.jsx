import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './components/ProductCard';
import Checkout from './Checkout';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout: false,
    };
  }

  listProducts = () => {
    const { productsCart } = this.props;
    return (
      <div>
        {productsCart.map((product, index) => (
          <div key={ index + product.productTitle }>
            <ProductCard
              productTitle={ product.productTitle }
              thumbnail={ product.thumbnail }
              price={ product.price }
            />
          </div>
        ))}
      </div>
    );
  };

  enableCheckout = () => {
    this.setState({
      checkout: true,
    });
  };

  renderCheckoutForm = () => {
    const { productsCart } = this.props;
    return (
      <section>
        <article>
          <Checkout
            productsCart={ productsCart }
          />
        </article>
      </section>
    );
  }

  render() {
    const { renderCheckoutForm, enableCheckout } = this;
    const { productsCart } = this.props;
    const { checkout } = this.state;
    return (
      <section>
        <article>
          {productsCart.length === 0
            ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
            : this.listProducts()}
        </article>
        <button
          data-testid="checkout-products"
          type="button"
          onClick={ () => enableCheckout() }
        >
          Finalizar Compra
        </button>
        <article>
          { checkout && renderCheckoutForm() }
        </article>
      </section>
    );
  }
}

ShoppingCart.propTypes = {
  productsCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }).isRequired,
};

export default ShoppingCart;
