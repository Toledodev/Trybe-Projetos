import { screen, fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from './test-helpers';

const EMAIL_DE_TESTE = 'algum@email.com';
const EMAIL_DE_TESTE_INVALIDO = 'algum-email.com';
const SENHA_DE_TESTE = '123456789';

describe('Testa a tela de Login', () => {
  it('Os inputs de email, senha e o botão de login aparecem na tela', () => {
    renderWithRouter(<App />);
    const emailHTML = screen.getByTestId('email-input');
    const passwordHTML = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(emailHTML).toBeInTheDocument();
    expect(passwordHTML).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();

    fireEvent.change(emailHTML, { target: { value: EMAIL_DE_TESTE } });
    expect(emailHTML.value).toBe(EMAIL_DE_TESTE);

    fireEvent.change(passwordHTML, { target: { value: SENHA_DE_TESTE } });
    expect(passwordHTML.value).toBe(SENHA_DE_TESTE);
  });

  it('O botão de login não é habilitado com um email inválido', () => {
    renderWithRouter(<App />);
    const emailHTML = screen.getByTestId('email-input');
    const passwordHTML = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    fireEvent.change(emailHTML, { target: { value: EMAIL_DE_TESTE_INVALIDO } });
    expect(emailHTML.value).toBe(EMAIL_DE_TESTE_INVALIDO);

    fireEvent.change(passwordHTML, { target: { value: SENHA_DE_TESTE } });
    expect(passwordHTML.value).toBe(SENHA_DE_TESTE);

    expect(loginBtn.disabled).toBe(true);

    fireEvent.change(emailHTML, { target: { value: EMAIL_DE_TESTE } });
    expect(emailHTML.value).toBe(EMAIL_DE_TESTE);
  });
});
