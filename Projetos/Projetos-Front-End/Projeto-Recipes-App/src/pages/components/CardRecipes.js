import PropTypes from 'prop-types';
import { Box, Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../../context/AppContext';
import { fetchByCategory } from '../helpers/fetchAPI';
import Card from './Card';

const useStyles = makeStyles({
  recipeList: {
    width: '100vw',
    padding: '8px',
  },
});

export default function CardRecipes({ url, maxLength }) {
  const [categoryFilteredData, setCategoryFilteredData] = useState([]);
  const { data, setData, selectedCategory,
    defaultData, setDefaultData } = useContext(AppContext);
  const history = useHistory();
  const MAX_LENGTH = maxLength;
  const classes = useStyles();

  useEffect(() => {
    async function doFetch() {
      if (url && defaultData.length === 0) {
        const response = await fetch(url);
        const fetchData = await response.json();
        setDefaultData(Object.values(fetchData)[0]);
      }
    }
    doFetch();
  }, [setDefaultData, url, defaultData.length]);

  useEffect(() => {
    async function doCategoryFetch() {
      const path = history.location.pathname;
      const categoryData = await fetchByCategory(selectedCategory, path);

      setCategoryFilteredData(categoryData);
    }
    doCategoryFetch();
  }, [selectedCategory, history.location.pathname]);

  if (data === null) {
    setData([]);

    return defaultData.slice(0, MAX_LENGTH)
      .map((recipe, index) => <Card recipe={ recipe } key={ index } index={ index } />);
  }

  if (selectedCategory !== 'All' && categoryFilteredData) {
    return categoryFilteredData.slice(0, MAX_LENGTH)
      .map((recipe, index) => <Card recipe={ recipe } key={ index } index={ index } />);
  }

  return (
    <Box className={ classes.recipeList }>
      <Grid container spacing={ 1 }>
        {
          data.length ? data.slice(0, MAX_LENGTH)
            .map((recipe, index) => (
              <Grid item key={ index } xs={ 6 }>
                <Card recipe={ recipe } index={ index } />
              </Grid>
            ))
            : defaultData.slice(0, MAX_LENGTH)
              .map((recipe, index) => (
                <Grid item key={ index } xs={ 6 }>
                  <Card recipe={ recipe } index={ index } />
                </Grid>
              ))
        }
      </Grid>
    </Box>
  );
}

CardRecipes.propTypes = {
  maxLength: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};
