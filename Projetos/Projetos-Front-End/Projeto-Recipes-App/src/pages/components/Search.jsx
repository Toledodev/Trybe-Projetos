import {
  Box,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import React, { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../../context/AppContext';
import fetchAPI from '../helpers/fetchAPI';

const types = ['ingredients', 'name', 'first-letter'];

const useStyles = makeStyles({
  search: {
    width: '100vw',
    padding: '8px',
  },
});

function Search() {
  const history = useHistory();
  const oneLetter = useRef(null);
  const [query, setQuery] = useState('');
  const [type, setType] = useState(types[0]);
  const { setData } = useContext(AppContext);

  const classes = useStyles();

  async function handleClick() {
    if (oneLetter.current.checked && query.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const APIData = await fetchAPI(type, query, history.location.pathname);
    setData(APIData);

    if (!APIData) {
      return global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    if (APIData.length === 1) {
      const id = Object.values(APIData[0])[0];
      const key = Object.keys(APIData[0])[0];
      return key.includes('eal') ? history.push(`/comidas/${id}`)
        : history.push(`/bebidas/${id}`);
    }
  }

  return (
    <Box
      component="div"
      sx={ { bgcolor: 'primary.dark',
        color: 'text.primary',
      } }
      className={ classes.search }
    >
      <Grid
        container
        direction="column"
        spacing={ 1 }
      >
        <Grid item>
          <TextField
            placeholder="Digite sua busca"
            type="text"
            name="query"
            inputProps={ {
              'data-testid': 'search-input',
            } }
            value={ query }
            onChange={ ({ target }) => setQuery(target.value) }
          />
        </Grid>
        <RadioGroup
          name="search-type"
        >
          <FormControlLabel
            value="ingredients"
            control={
              <Radio
                type="radio"
                id="ingredients"
                onClick={ () => setType(types[0]) }
                data-testid="ingredient-search-radio"
              />
            }
            label="Ingrediente"
          />
          <FormControlLabel
            value="name"
            control={
              <Radio
                type="radio"
                name="search-type"
                id="name"
                onClick={ () => setType(types[1]) }
                data-testid="name-search-radio"
              />
            }
            label="Nome"
          />
          <label htmlFor="first-letter">
            <input
              ref={ oneLetter }
              type="radio"
              name="search-type"
              id="first-letter"
              onClick={ () => setType(types[2]) }
              data-testid="first-letter-search-radio"
            />
            Primeira letra
          </label>
        </RadioGroup>
        <Grid item>
          <button
            type="button"
            onClick={ handleClick }
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Search;
