import React, { useContext, useState, useEffect } from 'react';
import Context from '../Context';
import topicsList, { apiList, indicatorType } from '../helpers';

function Table() {
  const { data, filter, setFilter } = useContext(Context);

  // const [inputSearch, setinputSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [valueFilter, setValueFilter] = useState(0);
  const [dropDownValue, setDropDownValue] = useState('population');
  const [indicator, setIndicator] = useState('maior que');
  const [dropDownOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  // function handleInputChange({ target }) {
  //   setinputSearch(target.value);
  // }

  useEffect(() => {
    if (data.length !== 0) {
      setFilteredData(data);
    }
  }, [data]);

  function setValuesFilter({ target }) {
    setFilter({ ...filter, filterByName: { name: target.value } });
    setFilteredData(
      data.filter((planet) => planet.name.toLowerCase().includes(target.value)),
    );
  }

  function onClickButton() { // Função feita com a ajuda de meu grande amigo Matheus Muniz da Tribo A :)
    setFilter({ ...filter,
      filterByNumericValues: [
        {
          column: dropDownValue,
          comparison: indicator,
          value: valueFilter,
        },
      ] });

    const indexDropDown = dropDownOptions.indexOf(dropDownValue);
    dropDownOptions.splice(indexDropDown, 1);

    if (indicator === 'maior que') {
      setFilteredData(data
        .filter((planet) => Number(planet[dropDownValue]) > Number(valueFilter)));
    } if (indicator === 'menor que') {
      setFilteredData(data
        .filter((planet) => Number(planet[dropDownValue]) < Number(valueFilter)));
    } if (indicator === 'igual a') {
      setFilteredData(data
        .filter((planet) => Number(planet[dropDownValue]) === Number(valueFilter)));
    }
  }

  return (
    <>
      <h1>Projeto Star Wars - Trybe</h1>
      <form className="inputs">
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            type="text"
            placeholder="Filtrar por nome"
            onChange={ setValuesFilter }
          />
        </label>

        <label htmlFor="column-filter">
          <select
            data-testid="column-filter"
            onChange={ (e) => setDropDownValue(e.target.value) }
          >
            { dropDownOptions.map((item) => <option key={ item }>{item}</option>) }
          </select>
        </label>
        { indicatorType(setIndicator) }

        <label htmlFor="value-filter">
          <input
            data-testid="value-filter"
            type="number"
            value={ valueFilter }
            onChange={ (e) => setValueFilter(e.target.value) }
          />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => onClickButton() }
        >
          Filtrar
        </button>
      </form>

      <table>
        <thead>
          { topicsList() }
        </thead>

        <tbody>
          { filteredData
            .map((planet, index) => (
              apiList(planet, index)
            ))}
        </tbody>
      </table>
    </>
  );
}
export default Table;
