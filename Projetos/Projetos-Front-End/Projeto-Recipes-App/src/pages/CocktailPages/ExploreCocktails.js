import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { randomFetch } from '../helpers/fetchAPI';

export default function ExploreCockTails() {
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

  console.log(randomFetchData);

  return (
    <>
      <Header title="Explorar Bebidas" displaySearch={ false } />

      <button
        type="button"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </button>

      <button
        type="button"
        onClick={ () => history.push(`/bebidas/${randomFetchData.idDrink}`) }
        data-testid="explore-surprise"
      >
        Me Surpreenda!

      </button>

      <Footer />
    </>
  );
}
