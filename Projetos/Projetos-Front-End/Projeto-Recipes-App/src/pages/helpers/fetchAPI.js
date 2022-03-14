import { MEAL_URLS, DRINK_URLS } from '../../consts';

export default async function fetchAPI(type, value, location) {
  let response = null;
  let data = null;

  if (location.includes('comidas')) {
    // Procura pela API de Drinks
    switch (type) {
    case 'ingredients':
      response = await fetch(`${MEAL_URLS.BY_INGREDIENT}${value}`);
      data = await response.json();
      break;
    case 'name':
      response = await fetch(`${MEAL_URLS.NAME}${value}`);
      data = await response.json();
      break;
    case 'first-letter':
      response = await fetch(`${MEAL_URLS.FIRST_LETTER}${value}`);
      data = await response.json();
      break;
    default:
      return console.log('DEU RUIM');
    }
    return Object.values(data)[0];
  }

  // Procura pela API de comidas
  switch (type) {
  case 'ingredients':
    response = await fetch(`${DRINK_URLS.BY_INGREDIENT}${value}`);
    data = await response.json();
    break;
  case 'name':
    response = await fetch(`${DRINK_URLS.NAME}${value}`);
    data = await response.json();
    break;
  case 'first-letter':
    response = await fetch(`${DRINK_URLS.FIRST_LETTER}${value}`);
    data = await response.json();
    break;
  default:
    return console.log('DEU RUIM');
  }

  return Object.values(data)[0];
}

// Busca por categoria
export async function fetchByCategory(category, type) {
  if (type === '/bebidas') {
    const drinkResponse = await fetch(`${DRINK_URLS.CATEGORY}${category}`);
    const drinkData = await drinkResponse.json();
    return Object.values(drinkData)[0];
  }

  const mealResponse = await fetch(`${MEAL_URLS.CATEGORY}${category}`);

  const mealData = await mealResponse.json();
  return Object.values(mealData)[0];
}

// Busca aleatória

export async function randomFetch(type) {
  if (type.includes('/bebidas')) {
    const drinkResponse = await fetch(DRINK_URLS.RANDOM);
    const drinkData = await drinkResponse.json();
    return Object.values(drinkData)[0];
  }

  const mealResponse = await fetch(MEAL_URLS.RANDOM);

  const mealData = await mealResponse.json();
  return Object.values(mealData)[0];
}

// Busca pelos ingredientes

export async function ingredientsFetch(type) {
  if (type.includes('/bebidas')) {
    const drinkResponse = await fetch(DRINK_URLS.INGREDIENT);
    const drinkData = await drinkResponse.json();
    return Object.values(drinkData)[0];
  }

  const mealResponse = await fetch(MEAL_URLS.INGREDIENT);

  const mealData = await mealResponse.json();
  return Object.values(mealData)[0];
}

// Busca por alimentos de determinado ingrediente

export async function byIngredientsFetch(type, ingredient) {
  if (type.includes('/bebidas')) {
    const drinkResponse = await fetch(`${DRINK_URLS.BY_INGREDIENT}${ingredient}`);
    const drinkData = await drinkResponse.json();
    return Object.values(drinkData)[0];
  }

  const mealResponse = await fetch(`${MEAL_URLS.BY_INGREDIENT}${ingredient}`);

  const mealData = await mealResponse.json();
  return Object.values(mealData)[0];
}

// Busca das areas/localidades disponíveis para pesquisa

export async function areaListFetch() {
  const areasResponse = await fetch(MEAL_URLS.AREAS_LIST);

  const areasData = await areasResponse.json();
  return Object.values(areasData)[0];
}

export async function byAreaFetch(area) {
  const areaResponse = await fetch(`${MEAL_URLS.BY_AREA}${area}`);

  const areaRecipesData = await areaResponse.json();
  return Object.values(areaRecipesData)[0];
}
