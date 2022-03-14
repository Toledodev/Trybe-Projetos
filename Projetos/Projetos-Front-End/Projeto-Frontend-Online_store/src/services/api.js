export async function getCategories() {
  const urlApi = 'https://api.mercadolibre.com/sites/MLB/categories';
  const categories = await fetch(urlApi);
  const categoriesJson = categories.json();
  return categoriesJson;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlApi = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const searchResult = await fetch(urlApi);
  const searchResultJson = searchResult.json();
  return searchResultJson;
}
