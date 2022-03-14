import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Home from './pages/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/components/ProductDetails';
import Checkout from './pages/Checkout';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productsCart: [],
    };
  }

  addToCart = (event, thumbnail, productTitle, price) => {
    event.preventDefault();
    const thisProduct = {
      thumbnail,
      productTitle,
      price,
    };
    this.setState((prevState) => ({
      productsCart: [...prevState.productsCart, thisProduct],
    }));
  }

  render() {
    const { addToCart } = this;
    const { productsCart } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Home
              { ...props }
              productsCart={ productsCart }
              addToCart={ addToCart }
            />) }
          />
          <Route
            exact
            path="/cart"
            render={ (props) => (
              <ShoppingCart
                { ...props }
                productsCart={ productsCart }
                addToCart={ addToCart }
              />) }
          />
          <Route
            exact
            path="/product/:categorieId/:id/:query"
            render={ (props) => (
              <ProductDetails
                { ...props }
                productsCart={ productsCart }
                addToCart={ addToCart }
              />) }
          />
          <Route
            exact
            path="/checkout"
            component={ Checkout }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default App;
