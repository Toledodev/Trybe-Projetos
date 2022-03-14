import React, { useEffect, useState, useCallback } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import filterObjIntoArray from '../helpers/dataManagement';
import Carrousel from '../components/Carrousel';
import { DRINK_URLS, MEAL_URLS } from '../../consts';
import ShareButton from '../components/ShareButton';
import FavouriteButton from '../components/FavouriteButton';

export default function FoodRecipeDetails() {
  const { id } = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const memoizedData = useCallback(
    async () => {
      const response = await fetch(`${MEAL_URLS.ID}${id}`);
      const dataDetails = await response.json();
      const recipes = dataDetails.meals[0];
      setRecipe(recipes);
      setIngredients(filterObjIntoArray(recipes, 'Ingredient'));
      setMeasures(filterObjIntoArray(recipes, 'Measure'));
    }, [id],
  );

  const showButton = () => {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      console.log(doneRecipes);
      if (doneRecipes.some((recipeItem) => recipeItem.id === id)) {
        return ('');
      }
    }

    if (localStorage.getItem('inProgressRecipes')) {
      const doneRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      console.log(doneRecipes);
      if (doneRecipes.meals[id]) {
        return (
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: '0' } }
          >
            Continuar Receita
          </button>
        );
      }
    }
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0' } }
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
      >
        Iniciar Receita
      </button>
    );
  };

  useEffect(() => {
    memoizedData();
  }, [memoizedData]);

  return (
    <div>
      {recipe ? (
        <div>
          <img src={ recipe.strMealThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
          <ShareButton />
          <FavouriteButton id={ id } recipe={ recipe } />
          <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>

          <ul>
            Ingredientes:
            {ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${measures[index]} of ${ingredient}`}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">
            Intruções de preparo:
            <br />
            {recipe.strInstructions}
          </p>
          <video data-testid="video" controls>
            <source src={ recipe.strYoutube } type="video/mp4" />
            <track src="" kind="captions" srcLang="en" label="English" />
          </video>

          <Carrousel url={ DRINK_URLS.NAME } />
          {showButton()}
        </div>
      ) : <Loading />}
    </div>
  );
}
