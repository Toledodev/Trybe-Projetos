import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      isLoading: false,
      recoverySongs: [],
    };
  }

  componentDidMount() {
    this.matchMusics();
    this.recoveryFavoritesSongs();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { recoverySongs } = this.state;
    if (prevState.recoverySongs !== recoverySongs) {
      this.isCheckedFavorites();
    }
  }

  recoveryFavoritesSongs = async () => {
    this.setState({
      isLoading: true,
    });
    const response = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      recoverySongs: [...response],
    });
  }

  isCheckedFavorites = () => {
    const { recoverySongs } = this.state;
    recoverySongs.forEach((song) => {
      const songId = song.trackId;
      const favMusic = document.getElementById(`${songId}`);
      if (favMusic) {
        favMusic.checked = 'true';
        console.log('alterei');
      }
    });
  }

  getMusicsInfos = () => {
    const { musics } = this.state;
    if (musics.length > 0) {
      const artWork = musics[0].artworkUrl100;
      const { collectionName } = musics[0];
      const { artistName } = musics[0];

      return (
        <div>
          <h3 data-testid="artist-name">{ artistName }</h3>
          <img src={ artWork } alt={ collectionName } />
          <p data-testid="album-name">{ collectionName }</p>
        </div>
      );
    }
  }

    matchMusics = async () => {
      const { match: { params: { id } } } = this.props;
      const response = await getMusics(id);
      this.setState({
        musics: [...response],
      });
    }

    render() {
      const { musics, isLoading } = this.state;

      if (isLoading) return <Loading />;
      return (
        <div data-testid="page-album">
          <Header />
          { this.getMusicsInfos() }
          { musics.slice(1).map((music) => (<MusicCard
            key={ music.trackId }
            track={ music }
          />)) }
        </div>
      );
    }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
