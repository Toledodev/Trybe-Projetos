import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      query: ' ',
      thumbnail: '',
      categorieId: '',
      productTitle: '',
      description: '',
      price: '',
    };
  }

  componentDidMount() {
    this.setProductInfo();
  }

  setProductInfo = () => {
    const { match: { params } } = this.props;
    const { id, categorieId } = params;
    let { query } = params;
    if (query === 'endpoint') query = '';
    console.log(categorieId, query);
    this.setState({ id, categorieId, query }, () => this.getProduct());
  }

  getProduct = async () => {
    const { id, categorieId, query } = this.state;

    const products = await getProductsFromCategoryAndQuery(categorieId, query);
    const filteredProduct = products.results.filter((product) => product.id === id);
    const { title, thumbnail, price, condition } = filteredProduct[0];
    console.log(filteredProduct, title);
    this.setState({
      productTitle: title,
      thumbnail,
      price,
      description: condition,
    });
  }

  render() {
    const { thumbnail, productTitle, price, description } = this.state;
    return (
      <section>
        <h3 data-testid="product-detail-name">{ productTitle }</h3>
        <img src={ thumbnail } alt={ productTitle } />
        <p>{`R$ ${price}`}</p>
        <p>{ description }</p>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      categorieId: PropTypes.string.isRequired,
      query: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
