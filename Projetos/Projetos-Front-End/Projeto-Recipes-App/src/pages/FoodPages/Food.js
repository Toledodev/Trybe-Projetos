import React from 'react';
import { MEAL_URLS } from '../../consts';
import CardRecipes from '../components/CardRecipes';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Food() {
  return (
    <>
      <Header title="Comidas" />
      <Filters />
      <CardRecipes url={ MEAL_URLS.NAME } maxLength={ 12 } />
      <Footer />
    </>
  );
}
