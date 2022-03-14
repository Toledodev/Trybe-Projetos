import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ItemCard extends React.Component {
  render() {
    const { products, query, addToCart } = this.props;
    return (
      <div>
        {products.map((product) => (
          <div
            key={ product.id }
            data-testid="product"
          >
            <h3>{ product.title }</h3>
            <img src={ product.thumbnail } alt={ `Imagem de ${product.title}` } />
            <p>{`R$ ${product.price}`}</p>
            <button
              type="button"
              onClick={ (event) => addToCart(
                event, product.thumbnail, product.title, product.price,
              ) }
              data-testid="product-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
            <Link
              data-testid="product-detail-link"
              to={ `/product/${product.category_id}/${product.id}/${query
                || 'endpoint'}` }
            >
              Detalhes
            </Link>

          </div>
        ))}
      </div>
    );
  }
}

ItemCard.propTypes = {
  products: PropTypes.arrayOf('object').isRequired,
  query: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ItemCard;
