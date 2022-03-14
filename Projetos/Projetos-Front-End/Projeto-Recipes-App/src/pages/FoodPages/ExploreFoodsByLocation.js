import React, { useEffect, useState, useContext } from 'react';
import { MEAL_URLS } from '../../consts';
import AppContext from '../../context/AppContext';
import CardRecipes from '../components/CardRecipes';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { areaListFetch, byAreaFetch } from '../helpers/fetchAPI';

export default function ExploreFoodsByOrigin() {
  const [areasList, setAreasList] = useState([]);
  const [noFilterData, setNoFilterData] = useState([]);
  const { defaultData, setDefaultData } = useContext(AppContext);

  /*
  TODO:
  1. Corrigir erros dos requisitos 80 e 81
  */

  useEffect(() => {
    async function doAreaListFetch() {
      const areasListData = await areaListFetch();
      setAreasList(areasListData);
      if (!noFilterData.length) {
        setNoFilterData(defaultData);
      }
    }
    doAreaListFetch();
  }, [defaultData, noFilterData.length]);

  async function handleChange(e) {
    if (e === 'All') {
      setDefaultData(noFilterData);
      return '';
    }

    const recipesByArea = await byAreaFetch(e);
    setDefaultData(recipesByArea);
  }

  return (
    <>
      <Header title="Explorar Origem" />

      <select
        name="location-dropdown"
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target }) => handleChange(target.value) }
      >
        <option
          value="All"
          data-testid="All-option"
        >
          All
        </option>

        {areasList.length && areasList.map(({ strArea }, i) => (
          <option
            value={ strArea }
            data-testid={ `${strArea}-option` }
            key={ i }
          >
            {strArea}
          </option>
        ))}
      </select>

      <CardRecipes url={ MEAL_URLS.NAME } maxLength={ 12 } />

      <Footer />
    </>
  );
}
