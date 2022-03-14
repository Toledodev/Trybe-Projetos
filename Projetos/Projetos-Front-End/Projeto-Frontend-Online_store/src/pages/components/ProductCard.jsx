import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
  constructor() {
    super();
    this.state = {
      productQuantity: 1,
    };
  }

  increaseItemInCart = () => {
    this.setState((prevState) => ({
      productQuantity: Number(prevState.productQuantity) + 1,
    }));
  };

  decreaseItemInCart = () => {
    const { productQuantity } = this.state;
    if (productQuantity > 0) {
      this.setState((prevState) => ({
        productQuantity: Number(prevState.productQuantity) - 1,
      }));
    }
  }

  render() {
    const { increaseItemInCart, decreaseItemInCart } = this;
    const { productTitle, thumbnail, price } = this.props;
    const { productQuantity } = this.state;
    return (
      <div className="product-card">
        <img src={ thumbnail } alt={ productTitle } />
        <h3 data-testid="shopping-cart-product-name">{ productTitle }</h3>
        <p>{ price }</p>
        <p data-testid="shopping-cart-product-quantity">
          { productQuantity }
        </p>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ increaseItemInCart }
        >
          Aumentar quantidade
        </button>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ decreaseItemInCart }
        >
          Diminuir quantidade
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  productTitle: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default ProductCard;
