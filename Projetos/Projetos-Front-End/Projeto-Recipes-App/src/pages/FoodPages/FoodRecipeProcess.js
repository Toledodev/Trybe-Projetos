import React, { useEffect, useState, useCallback, useContext } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import filterObjIntoArray from '../helpers/dataManagement';
import Carrousel from '../components/Carrousel';
import { DRINK_URLS, MEAL_URLS } from '../../consts';
import ShareButton from '../components/ShareButton';
import FavouriteButton from '../components/FavouriteButton';
import AppContext from '../../context/AppContext';

export default function FoodRecipeProcess() {
  const { id } = useParams();
  const history = useHistory();
  const { setRecipeProgress } = useContext(AppContext);

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

  const checkProgress = useCallback((index) => {
    if (!localStorage.getItem('recipeProgress')) {
      const empty = new Array(ingredients.length).fill(false);
      localStorage.setItem('recipeProgress', JSON.stringify(empty));
    }
    const newProgress = [...JSON.parse(localStorage.getItem('recipeProgress'))];
    newProgress[index] = !newProgress[index];

    console.log(newProgress);
    localStorage.setItem('recipeProgress', JSON.stringify(newProgress));

    setRecipeProgress(JSON.parse(localStorage.getItem('recipeProgress')));
  }, [ingredients, setRecipeProgress]);

  const showButton = () => (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      style={ { position: 'fixed', bottom: '0' } }
      onClick={ () => history.push('/receitas-feitas') }
      disabled={
        localStorage.getItem('recipeProgress')
          ? JSON.parse(localStorage.getItem('recipeProgress')).includes(false)
          : true
      }
    >
      Finalizar Receita
    </button>
  );

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
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  name={ ingredient }
                  id={ index }
                  onClick={ () => checkProgress(index) }
                  defaultChecked={
                    localStorage.getItem('recipeProgress')
                      ? JSON.parse(localStorage.getItem('recipeProgress'))[index]
                      : false
                  }
                />
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
