import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';

const starWarsUrl = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues:
      [{
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      }],
  });

  async function getPlanets() {
    const response = await fetch(starWarsUrl).then((res) => res.json());
    setData(response.results);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  const context = { data, filter, setFilter };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
