import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function Carrousel({ url }) {
  const [recommendations, setRecommendations] = useState([]);
  const [carrouselIndex, setCarrouselIndex] = useState(0);

  useEffect(() => {
    const getRecomments = async () => {
      const NUMBER_OF_RECOMMENDATIONS = 6;
      const response = await fetch(url);
      const APIData = await response.json();
      setRecommendations(Object.values(APIData)[0].slice(0, NUMBER_OF_RECOMMENDATIONS));
    };
    setCarrouselIndex(0);
    getRecomments();
  }, [url]);
  return (
    <div>
      {recommendations ? recommendations.map(
        (recipe, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
            style={
              { display: carrouselIndex === index
                || carrouselIndex + 1 === index ? 'block' : 'none' }
            }
          >
            <h1 data-testid={ `${index}-recomendation-title` }>
              { recipe.strMeal || recipe.strDrink}
            </h1>
            <img
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt={ recipe.strMeal || recipe.strDrink }
            />
          </div>
        ),
      ) : ''}
    </div>
  );
}

Carrousel.propTypes = {
  url: PropTypes.string.isRequired,
};
