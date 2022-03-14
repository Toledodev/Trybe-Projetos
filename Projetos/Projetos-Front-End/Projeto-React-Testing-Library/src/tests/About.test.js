import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('testing about component', () => {
  it('should render title with "about pokedex" text', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(title).toBeDefined();
  });

  it('should be two paragraph with about pokemons', () => {
    renderWithRouter(<About />);

    const paragraph = screen.getAllByText(/Pokémons/i);
    expect(paragraph).toHaveLength(2);
  });

  it('should be a pokedex image', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
