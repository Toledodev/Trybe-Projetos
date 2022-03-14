import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
  card: {
    padding: '8px',
  },
  image: {
    width: '100%',
    padding: '8px',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '500',
  },
});
export default function Card({ recipe: {
  strMealThumb, strMeal, idMeal, strDrinkThumb, strDrink, idDrink }, index }) {
  function linkTo() {
    if (!!idDrink === true) return `/bebidas/${idDrink}`;
    return `/comidas/${idMeal}`;
  }
  const classes = useStyle();
  return (
    <Link to={ linkTo() }>
      <Paper
        data-testid={ `${index}-recipe-card` }
        className={ classes.card }
        elevation={ 4 }
      >
        <Typography
          variant="h4"
          className={ classes.title }
          data-testid={ `${index}-card-name` }
          gutterBottom
        >
          { strMeal || strDrink }
        </Typography>
        <img
          className={ classes.image }
          data-testid={ `${index}-card-img` }
          src={ strMealThumb || strDrinkThumb }
          alt=""
        />
      </Paper>
    </Link>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape(PropTypes.any).isRequired,
};
