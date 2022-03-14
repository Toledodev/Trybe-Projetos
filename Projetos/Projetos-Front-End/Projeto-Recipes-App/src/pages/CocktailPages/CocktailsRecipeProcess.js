import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MEAL_URLS } from '../../consts';
import AppContext from '../../context/AppContext';
import Carrousel from '../components/Carrousel';
import FavouriteButton from '../components/FavouriteButton';
import Loading from '../components/Loading';
import ShareButton from '../components/ShareButton';
import filterObjIntoArray from '../helpers/dataManagement';

export default function CockTailsRecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { setRecipeProgress } = useContext(AppContext);

  const [cocktail, setCocktail] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  // const [doneRecipes, setDoneRecipes] = useState([]);

  if (localStorage.getItem('doneRecipes')) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(doneRecipes);
  }

  const memoizedData = useCallback(
    async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataDetails = await response.json();
      setCocktail(dataDetails.drinks[0]);
      setIngredients(filterObjIntoArray(dataDetails.drinks[0], 'Ingredient'));
      setMeasures(filterObjIntoArray(dataDetails.drinks[0], 'Measure'));
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
      {cocktail ? (
        <div>
          <img src={ cocktail.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{ cocktail.strDrink }</h1>
          <ShareButton />
          <FavouriteButton id={ id } recipe={ cocktail } />
          <h3 data-testid="recipe-category">{ cocktail.strAlcoholic }</h3>

          <ol>
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
                {`${ingredient} ${measures[index]}`}
              </li>
            ))}
          </ol>
          <p data-testid="instructions">
            Intruções de preparo:
            <br />
            {cocktail.strInstructions}
          </p>
          <video data-testid="video" controls>
            <source src={ cocktail.strYoutube } type="video/mp4" />
            <track src="" kind="captions" srcLang="en" label="English" />
          </video>

          <Carrousel url={ MEAL_URLS.NAME } />

          {showButton()}
        </div>
      ) : <Loading />}
    </div>
  );
}
