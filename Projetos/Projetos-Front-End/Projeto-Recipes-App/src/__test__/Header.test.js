import React from 'react';
import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './test-helpers';

describe('Testa o Header', () => {
  it('O título e os botões de perfil e pesquisar aparecem na tela.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./comidas');
    console.log(history.push);
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(profileTopBtn).toBeInTheDocument();
    expect(searchTopBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  // it('Redireciona o usuário a tela de Perfil ao clicar no botão correspondente.', () => {
  //   renderWithRouter(<App />, { route: '/food' });

  // console.log(history);

  // history.push('/food');
  // const profileTopBtn = screen.getByTestId('profile-top-btn');
  // userEvent.click(profileTopBtn);
  // expect(history.location.pathname).toBe('/profile');

  // const searchTopBtn = screen.getByTestId('search-top-btn');
  // const searchInput = screen.getByTestId('search-input');

  // userEvent.click(searchTopBtn);
  // expect(searchInput).toBeInTheDocument();

  // userEvent.click(searchTopBtn);
  // expect(searchInput).not.toBeInTheDocument();
  // });

  // it('Ao clicar no botão de pesquisar, a barra de pesquisa aparece/desaparece.', () => {
  //   renderWithRouter(<Food />);
  //   const searchTopBtn = screen.getByTestId('search-top-btn');
  //   const searchInput = screen.getByTestId('search-input');

  //   userEvent.click(searchTopBtn);
  //   expect(searchInput).toBeInTheDocument();

  //   userEvent.click(searchTopBtn);
  //   expect(searchInput).not.toBeInTheDocument();
  // });
});
