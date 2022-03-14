import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

export default function Explore() {
  const history = useHistory();
  return (
    <>
      <Header title="Explorar" displaySearch={ false } />

      <button
        type="button"
        onClick={ () => history.push('/explorar/comidas') }
        data-testid="explore-food"
      >
        Explorar Comidas

      </button>

      <button
        type="button"
        onClick={ () => history.push('/explorar/bebidas') }
        data-testid="explore-drinks"
      >
        Explorar Bebidas

      </button>

      <Footer />
    </>
  );
}
