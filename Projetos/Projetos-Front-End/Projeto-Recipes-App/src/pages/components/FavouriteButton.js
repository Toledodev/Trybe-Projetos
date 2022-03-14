import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import BlackHearth from '../../images/blackHeartIcon.svg';
import WhiteHearth from '../../images/whiteHeartIcon.svg';

export default function FavouriteButton({ id, recipe }) {
  const [favourited, setFavourited] = useState(false);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes && favoriteRecipes.some((recipeItem) => recipeItem.id === id)) {
      setFavourited(true);
    }
  }, [id]);

  const favouriteRecipe = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavourited(!favourited);
    console.log(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes || [],
      {
        alcoholicOrNot: recipe.strAlcoholic || '',
        area: recipe.strArea || '',
        category: recipe.strCategory || '',
        id: recipe.idMeal || recipe.idDrink || '',
        image: recipe.strMealThumb || recipe.strDrinkThumb || '',
        type: recipe.strCategory === 'Cocktail' ? 'bebida' : 'comida' || '',
        name: recipe.strMeal || recipe.strDrink,
      },
    ]));
  };

  return (
    <button
      src={ favourited ? BlackHearth : WhiteHearth }
      type="button"
      data-testid="favorite-btn"
      onClick={ favouriteRecipe }
    >
      <img
        src={ favourited ? BlackHearth : WhiteHearth }
        alt="Not-Favourited"
      />
    </button>
  );
}

FavouriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};
