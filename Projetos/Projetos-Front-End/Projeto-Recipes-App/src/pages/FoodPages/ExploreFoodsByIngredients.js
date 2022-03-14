import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardIngredient from '../components/CardIngredient';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ingredientsFetch } from '../helpers/fetchAPI';

export default function ExploreFoodsByIngredients() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const MAX_INGREDIENTS = 12;

  useEffect(() => {
    async function doIngredientsFetch() {
      const foodIngredients = await ingredientsFetch(history.location.pathname);
      setIngredients(foodIngredients.slice(0, MAX_INGREDIENTS));
    }
    doIngredientsFetch();
  }, [history.location.pathname]);

  return (
    <>
      <Header title="Explorar Ingredientes" displaySearch={ false } />

      {ingredients.length && ingredients
        .map((ingredient, index) => (<CardIngredient
          ingredient={ ingredient }
          order={ index }
          key={ index }
        />))}
      <Footer />
    </>
  );
}
