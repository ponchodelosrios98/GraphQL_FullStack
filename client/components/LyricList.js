import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {

  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        _typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1,
        }
      },
    })
  }

  render() {
    return (
      <ul className="collection">
        {this.props.lyrics.map((lyric) => (
          <li key={lyric.id} className="collection-item">
            {lyric.content}
            <div className="vote-box">
              <i
                onClick={() => this.onLike(lyric.id, lyric.likes)}
                className="material-icons"
              >
                thumb_up
              </i>
              {lyric.likes}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id,
      content,
      likes
    }
  }
`

export default graphql(mutation)(LyricList);
