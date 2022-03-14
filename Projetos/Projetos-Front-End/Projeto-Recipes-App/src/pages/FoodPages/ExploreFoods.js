import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { randomFetch } from '../helpers/fetchAPI';

export default function ExploreFoods() {
  const history = useHistory();
  const [randomFetchData, setRandomFetchData] = useState([]);

  useEffect(() => {
    async function doRandomFetch() {
      const path = history.location.pathname;
      const randomData = await randomFetch(path);
      setRandomFetchData(randomData[0]);
    }
    doRandomFetch();
  }, [history.location.pathname]);

  return (
    <>
      <Header title="Explorar Comidas" displaySearch={ false } />

      <button
        type="button"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </button>

      <button
        type="button"
        onClick={ () => history.push('/explorar/comidas/area') }
        data-testid="explore-by-area"
      >
        Por Local de Origem

      </button>

      <button
        type="button"
        onClick={ () => history.push(`/comidas/${randomFetchData.idMeal}`) }
        data-testid="explore-surprise"
      >
        Me Surpreenda!

      </button>

      <Footer />
    </>
  );
}
