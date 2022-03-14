import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

export default function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));

  console.log(email.email);
  return (
    <>
      <Header title="Perfil" displaySearch={ false } />
      <p data-testid="profile-email">{email.email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas

      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas

      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => history.push('/') }
      >
        Sair

      </button>

      <Footer />
    </>
  );
}
