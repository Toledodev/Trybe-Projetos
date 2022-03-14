import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const useStyles = makeStyles({
  'page-footer': {
    width: '100vw',
    position: 'fixed',
    bottom: '0',
    zIndex: '999',
  },
  icon: {
    padding: '16px',
  },
});

export default function Footer() {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState('');

  return (
    <BottomNavigation
      className={ classes['page-footer'] }
      showLabels
      onChange={ (event, newValue) => {
        setValue(newValue);
      } }
      value={ value }
    >
      <BottomNavigationAction
        label="Bebidas"
        icon={
          <input
            data-testid="drinks-bottom-btn"
            type="image"
            alt="drinks bottom button"
            onClick={ () => history.push('/bebidas') }
            src={ drinkIcon }
          />
        }
      />
      <BottomNavigationAction
        label="Explorar"
        icon={
          <input
            data-testid="explore-bottom-btn"
            type="image"
            alt="explore bottom button"
            onClick={ () => history.push('/explorar') }
            src={ exploreIcon }
            classeName={ classes.icon }
          />
        }
      />
      <BottomNavigationAction
        label="Comidas"
        icon={
          <input
            data-testid="food-bottom-btn"
            type="image"
            alt="food bottom button"
            onClick={ () => history.push('/comidas') }
            src={ mealIcon }
            classeName={ classes.icon }
          />
        }
      />
    </BottomNavigation>
  );
}
