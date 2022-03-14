import React from 'react';
import { Route, Switch } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import Login from './pages/Login';
import Explore from './pages/Explore';
import Food from './pages/FoodPages/Food';
import ExploreFoods from './pages/FoodPages/ExploreFoods';
import ExploreFoodsByIngredients from './pages/FoodPages/ExploreFoodsByIngredients';
import ExploreFoodsByLocation from './pages/FoodPages/ExploreFoodsByLocation';
import FoodRecipeDetails from './pages/FoodPages/FoodRecipeDetails';
import FoodRecipeProcess from './pages/FoodPages/FoodRecipeProcess';
import Cocktails from './pages/CocktailPages/Cocktails';
import CocktailsRecipeDetails from './pages/CocktailPages/CocktailsRecipeDetails';
import CocktailsRecipeProcess from './pages/CocktailPages/CocktailsRecipeProcess';
import ExploreCocktails from './pages/CocktailPages/ExploreCocktails';
import CocktailsByIngredients from './pages/CocktailPages/ExploreCocktailsByIngredients';
import DoneRecipes from './pages/Recipes/DoneRecipes';
import FavoriteRecipes from './pages/Recipes/FavoriteRecipes';
import Profile from './pages/Profile';
import NotFound from './pages/components/NotFound';

import '@fontsource/roboto';

let theme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    },
    primary: {
      light: 'rgba(255, 201, 71, 1)',
      main: 'rgba(255, 152, 0, 1)',
      dark: 'rgba(198, 105, 0, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(249, 104, 58, 1)',
      main: 'rgba(191, 54, 12, 1)',
      dark: 'rgba(135, 0, 0, 1)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  } });
theme = responsiveFontSizes(theme);
function App() {
  return (
    <ThemeProvider theme={ theme }>

      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/comidas"
          component={ Food }
        />

        <Route
          exact
          path="/comidas/:id"
          component={ FoodRecipeDetails }
        />

        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ FoodRecipeProcess }
        />

        <Route
          exact
          path="/bebidas"
          component={ Cocktails }
        />

        <Route
          exact
          path="/bebidas/:id"
          component={ CocktailsRecipeDetails }
        />

        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ CocktailsRecipeProcess }
        />

        <Route
          exact
          path="/explorar"
          component={ Explore }
        />

        <Route
          exact
          path="/explorar/comidas"
          component={ ExploreFoods }
        />

        <Route
          exact
          path="/explorar/bebidas"
          component={ ExploreCocktails }
        />

        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsByIngredients }
        />

        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ CocktailsByIngredients }
        />

        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExploreFoodsByLocation }
        />

        <Route
          exact
          path="/perfil"
          component={ Profile }
        />

        <Route
          exact
          path="/receitas-feitas"
          component={ DoneRecipes }
        />

        <Route
          exact
          path="/receitas-favoritas"
          component={ FavoriteRecipes }
        />

        <Route
          path="/"
          component={ NotFound }
        />

      </Switch>

    </ThemeProvider>
  );
}

export default App;
