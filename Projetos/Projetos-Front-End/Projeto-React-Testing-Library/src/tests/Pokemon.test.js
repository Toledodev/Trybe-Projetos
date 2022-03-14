import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

test('render a card component with information', () => {
  renderWithRouter(<App />);

  const currentPokemonName = screen.getByTestId('pokemon-name');
  expect(currentPokemonName).toHaveTextContent('Pikachu');

  const currentPokemonType = screen.getByTestId('pokemon-type');
  expect(currentPokemonType).toHaveTextContent('Electric');

  const currentPokemonWeight = screen.getByTestId('pokemon-weight');
  expect(currentPokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

  const currentPokemonImg = screen.getByRole('img');
  expect(currentPokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(currentPokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
});

test('check for a navigation link to pokemon details', () => {
  renderWithRouter(<App />);

  const linkToDetails = screen.getByRole('link', { name: moreDetails });
  expect(linkToDetails).toHaveAttribute('href', '/pokemons/25');
});

test('redirect to details page when clicking the navigation link and changes url', () => {
  const { history } = renderWithRouter(<App />);

  const linkToDetails = screen.getByRole('link', { name: moreDetails });
  expect(linkToDetails).toBeInTheDocument();
  userEvent.click(linkToDetails);

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('check if favorite pokemons have a star icon', () => {
  renderWithRouter(<App />);

  const linkToDetails = screen.getByRole('link', { name: moreDetails });
  userEvent.click(linkToDetails);

  const favPokemon = screen.getByRole('checkbox');
  expect(favPokemon.checked).toBeFalsy();

  userEvent.click(favPokemon);

  const favStarIcon = screen.getByAltText('Pikachu is marked as favorite');
  expect(favStarIcon).toHaveAttribute('src', '/star-icon.svg');
});
