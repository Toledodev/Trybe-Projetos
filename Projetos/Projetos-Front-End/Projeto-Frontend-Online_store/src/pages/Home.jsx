import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ItemCard from './components/ItemCard';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Sidebar from './Sidebar';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryId: '',
      query: '',
      products: [],
    };
  }

  getProductsFromAPI = async () => {
    const { categoryId, query } = this.state;
    const response = await getProductsFromCategoryAndQuery(categoryId, query);
    this.setState({
      products: [...response.results],
    });
  };

  handleRadio = (categoryID) => {
    this.setState({
      categoryId: categoryID,
    }, () => this.getProductsFromAPI());
  };

  onSearchInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      query: value,
    });
  };

  onClickSearchButton = (event) => {
    event.preventDefault();
    this.getProductsFromAPI();
  }

  render() {
    const { onSearchInputChange, handleRadio, onClickSearchButton } = this;
    const { products } = this.state;
    const { addToCart } = this.props;
    return (
      <>
        <div>
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
          <form>
            <label htmlFor="input-search">
              <input
                data-testid="query-input"
                onChange={ onSearchInputChange }
                type="text"
              />
            </label>
            <button
              data-testid="query-button"
              type="submit"
              onClick={ onClickSearchButton }
            >
              Buscar
            </button>
          </form>
          <Link
            data-testid="shopping-cart-button"
            to="/cart"
          >
            Carrinho
          </Link>
        </div>
        <div>
          <ItemCard products={ products } addToCart={ addToCart } />
        </div>
        <div>
          <Sidebar
            handleRadio={ handleRadio }
          />
        </div>
      </>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Home;
