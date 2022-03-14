import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokedex component', () => {
  it('should be render a title with "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', {
      name: (/Encountered pokémons/i),
      level: 2,
    });
    expect(title).toBeDefined();
  });

  it('should be render a next pokemon when user click on next button', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', {
      name: (/Próximo pokémon/i),
    });
    expect(nextBtn).toBeDefined();
    userEvent.click(nextBtn);
    expect(screen.getByText('Charmander')).toBeDefined();
  });

  it('should be render a one by one pokemon', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  it('should be render a filter button', () => {
    renderWithRouter(<App />);

    const filterTypeBtn = screen.getAllByTestId('pokemon-type-button');
    const filterLength = 7;
    expect(filterTypeBtn).toHaveLength(filterLength);

    pokemons.forEach(({ type }) => {
      const buttonType = screen.getByRole('button', {
        name: type,
      });
      expect(buttonType).toBeDefined();
    });
  });

  it('should be render a reset filter button called All', () => {
    renderWithRouter(<App />);

    const resetBtnAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(resetBtnAll).toBeDefined();

    userEvent.click(resetBtnAll);
    const defaultPokemon = screen.getByText('Pikachu');
    expect(defaultPokemon).toBeDefined();
  });
});
