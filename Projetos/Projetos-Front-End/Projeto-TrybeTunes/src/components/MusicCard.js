import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      checked: false,
    };
  }

  handleAddMusic = async () => {
    const { track } = this.props;
    this.setState({
      isLoading: true,
    });
    await addSong(track);
    this.setState({
      isLoading: false,
      checked: true,
    });
  }

  handleRemoveMusic = async () => {
    const { track } = this.props;
    this.setState({
      isLoading: true,
    });
    await removeSong(track);
    this.setState({
      isLoading: false,
      checked: false,
    });
  }

  handleFavotiresMusic = (check) => {
    if (check) {
      this.handleAddMusic();
    } else {
      this.handleRemoveMusic();
    }
  }

  render() {
    const { track: { trackName, previewUrl, trackId } } = this.props;
    const { isLoading, checked } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>

        <label htmlFor="input-checked">
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            defaultChecked={ checked }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ ({ target }) => {
              const check = target.checked;
              this.handleFavotiresMusic(check);
            } }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
