import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';

export default function Filters() {
  const { foodCategories, drinkCategories,
    setSelectedCategory } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  if (!!foodCategories.meals && !!drinkCategories.drinks && !categories.length) {
    const MAX_CATEGORIES = 5;
    if (history.location.pathname.includes('comidas')) {
      setCategories(foodCategories.meals.slice(0, MAX_CATEGORIES));
    } else {
      setCategories(drinkCategories.drinks.slice(0, MAX_CATEGORIES));
    }
  }

  function handleCategories(category) {
    setSelectedCategory((prevCat) => (prevCat === category ? 'All' : category));
  }

  return (
    <section className="filters-section">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleCategories('All') }
      >
        All
      </button>
      {categories.map(({ strCategory }, i) => (
        <button
          key={ i }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleCategories(strCategory) }
        >
          {strCategory}
        </button>
      ))}
    </section>
  );
}
