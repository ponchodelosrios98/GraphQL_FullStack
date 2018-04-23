import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchOneSong';
import gql from 'graphql-tag';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        songId: this.props.id,
        content: this.state.content,
      },
      refetchQueries: [{ query: fetchSong, variables: { id: this.props.id } }]
    }).then(() => {
      this.setState({ content: '' });
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a lyric</label>
        <input
          onChange={(e) => this.setState({ content: e.target.value })}
          value={this.state.content}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id,
      lyrics {
        id,
        likes,
        content,
      }
    }
  }
`
export default graphql(mutation)(LyricCreate);
