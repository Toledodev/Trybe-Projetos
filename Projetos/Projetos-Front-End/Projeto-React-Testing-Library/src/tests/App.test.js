import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test component App.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Includes links with texts "Home", "About" and "Favorites Pokémons"', () => {
    const homeComponent = screen.getByRole('link', { name: 'Home' });
    const aboutComponent = screen.getByRole('link', { name: 'About' });
    const favPokemonsComponent = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(homeComponent).toBeInTheDocument();
    expect(aboutComponent).toBeInTheDocument();
    expect(favPokemonsComponent).toBeInTheDocument();
  });

  it('On click goes to "Home" page', () => {
    const homeComponent = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeComponent);
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('On click goes to "About" page', () => {
    const aboutComponent = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutComponent);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });

  it('On click goes to "Favorite Pokémons" page', () => {
    const favPokemonsComponent = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favPokemonsComponent);
    expect(screen.getByText('Favorite pokémons')).toBeInTheDocument();
  });

  it('A non-existent page goes to a "Not Found" page', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rotanaoexistente');

    const notFoundTextEl = screen.getByText(/Page requested not found/i);
    expect(notFoundTextEl).toBeInTheDocument();
  });
});
