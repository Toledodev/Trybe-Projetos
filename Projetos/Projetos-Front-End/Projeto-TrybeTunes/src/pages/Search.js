import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import albumResponse from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      prevSearchInput: '',
      isSearchBtnDisabled: true,
      isLoading: false,
      tracks: [],
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    const { searchInput } = this.state;
    if (prevState.searchInput !== searchInput) {
      this.checkSearchInput();
    }
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  checkSearchInput = () => {
    const { searchInput } = this.state;
    const minimumCharacters = 2;
    this.setState({
      isSearchBtnDisabled: (searchInput.length < minimumCharacters),
    });
  }

  getTracks = async () => {
    const { searchInput } = this.state;
    this.setState({
      prevSearchInput: searchInput,
      isLoading: true,
    });
    const result = await albumResponse(searchInput);
    this.setState({
      tracks: [...result],
      searchInput: '',
      isLoading: false,
    });
    document.getElementsByName('searchInput').value = '';
  }

  renderTracks() {
    const { tracks, prevSearchInput } = this.state;

    if (tracks.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <section>
        <p>
          {`Resultado de álbuns de: ${prevSearchInput}`}
        </p>
        { tracks.map((track) => (
          <Link
            key={ track.collectionId }
            to={ `/album/${track.collectionId}` }
            data-testid={ `link-to-album-${track.collectionId}` }
          >
            <li>{track.collectionName}</li>
          </Link>
        ))}
      </section>
    );
  }

  render() {
    const { handleInputChange } = this;
    const { isSearchBtnDisabled, searchInput, isLoading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { isLoading ? (<Loading />) : (
          <form>
            <label htmlFor="search-artist-input">
              <input
                name="searchInput"
                type="text"
                data-testid="search-artist-input"
                value={ searchInput }
                onChange={ handleInputChange }
              />
            </label>
            <button
              name="searchArtistButton"
              type="button"
              data-testid="search-artist-button"
              disabled={ isSearchBtnDisabled }
              onClick={ this.getTracks }
            >
              Pesquisar
            </button>
          </form>
        )}
        { this.renderTracks() }
      </div>
    );
  }
}

export default Search;
