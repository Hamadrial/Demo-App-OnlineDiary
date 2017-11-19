import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    // this.props.posts is an object, so map() in Javascript cannot loop through
    // lodash map() can loop through object
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item list-posts-item" key={ post.id }>
          <Link to={ `/posts/${post.id}` } className="list-posts-item-title">
            Title: { post.title }
          </Link>
          
          <p className="text-truncate">{ post.content}</p>
        </li>
      );
    })
  }

  render() {
    return (
      <div className="diary">
        <div className="container">
          <div className="posts-list">
            <h1 className="list-group-title">Welcome back!</h1>

            <ul className="list-group list-posts">
              {this.renderPosts()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
