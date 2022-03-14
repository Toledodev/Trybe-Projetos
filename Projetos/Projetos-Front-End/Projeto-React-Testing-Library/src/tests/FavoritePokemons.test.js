import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testing FavoritePokemons component', () => {
  it('should be render "No favorite pokemon found" if user do not have one',
    () => {
      renderWithRouter(<FavoritePokemons />);

      const notFound = screen.getByText('No favorite pokemon found');
      expect(notFound).toBeDefined();
    });
});
