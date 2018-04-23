import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchOneSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    console.log(this.props);
    const { song, loading } = this.props.data;

    if (loading) {
      return (
        <div>
          <h3>Loading.....</h3>
        </div>
      );
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList
          lyrics={song.lyrics}
        />
        <LyricCreate
          id={this.props.params.id}
        />
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options: (props) => ({ variables: { id: props.params.id } })
})(SongDetail);
