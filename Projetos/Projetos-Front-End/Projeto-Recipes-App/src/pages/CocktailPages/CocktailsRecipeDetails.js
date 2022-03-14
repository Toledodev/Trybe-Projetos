import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MEAL_URLS } from '../../consts';
import Carrousel from '../components/Carrousel';
import FavouriteButton from '../components/FavouriteButton';
import Loading from '../components/Loading';
import ShareButton from '../components/ShareButton';
import filterObjIntoArray from '../helpers/dataManagement';

export default function CockTailsRecipeDetails() {
  const { id } = useParams();
  const history = useHistory();

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
      if (doneRecipes.cocktails[id]) {
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
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
      >
        INICIAR RECEITA
      </button>
    );
  };

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
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
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
