import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongs from '../queries/fetchSongs';
import deleteSongs from '../queries/deleteSong';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: {
        id,
      }
    }).then(() => this.props.data.refetch());
  }

  renderSongs() {
    if (this.props.data.loading) {
      return (
        <p>Loading</p>
      );
    }
    return (
      this.props.data.songs.map((song) => (
        <li key={song.id} className="collection-item">
          <Link to={`/songs/${song.id}`}>
            {song.title}
          </Link>
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(song.id)}
          >
            delete
          </i>
        </li>
      ))
    );
  }
    
  render() {
    return (
      <div> 
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSongs)(
  graphql(fetchSongs)(SongList)
);

