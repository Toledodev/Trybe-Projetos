import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ItemCard extends React.Component {
  render() {
    const { products, query } = this.props;
    console.log(this.props);
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

};

export default ItemCard;
