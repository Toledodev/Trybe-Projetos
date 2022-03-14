import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    this.setState({ id, categorieId, query }, () => this.getProduct());
  }

  getProduct = async () => {
    const { id, categorieId, query } = this.state;

    const products = await getProductsFromCategoryAndQuery(categorieId, query);
    const filteredProduct = products.results.filter((product) => product.id === id);
    const { title, thumbnail, price, condition } = filteredProduct[0];
    this.setState({
      productTitle: title,
      thumbnail,
      price,
      description: condition,
    });
  }

  render() {
    const { thumbnail, productTitle, price, description } = this.state;
    const { addToCart } = this.props;
    return (
      <>
        <section>
          <h3 data-testid="product-detail-name">{ productTitle }</h3>
          <img src={ thumbnail } alt={ productTitle } />
          <p>{`R$ ${price}`}</p>
          <p>{ description }</p>
          <Link
            onClick={ (event) => addToCart(event, thumbnail, productTitle, price) }
            data-testid="product-detail-add-to-cart"
            to={ {
              pathname: '/cart',
              state: {
                productTitle,
                price,
                thumbnail,
              },
            } }
          >
            Adicionar ao Carrinho
          </Link>
          <Link
            data-testid="shopping-cart-button"
            to="/cart"
          >
            Carrinho
          </Link>
        </section>
        <form>
          <div>
            <label htmlFor="input-email">
              <input
                id="input-email"
                placeholder="Email"
                type="email"
              />
            </label>
            <div>
              <input name="input-rate" type="radio" value="1" />
              <input name="input-rate" type="radio" value="2" />
              <input name="input-rate" type="radio" value="3" />
              <input name="input-rate" type="radio" value="4" />
              <input name="input-rate" type="radio" value="5" />
            </div>
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Mensagem (Opcional)"
              name="input-msg"
              id="input-msg"
              cols="30"
              rows="10"
            />
          </div>
          <button type="submit">Enviar</button>
        </form>

      </>
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
  addToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
