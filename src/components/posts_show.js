import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  // Fetch individual post by id
  componentDidMount() {
    // If we have a post, do not attempt to re-fetch the post
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  /*
  Returning a big list of posts
  helperFunction() {
    this.props.posts[this.props.match.params.id];
  }
  */

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // Returning a big list of posts
    // this.props.match.params.id

    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="single-post">
            <Link className="link" to="/">Back to home</Link>

            <button className="btn float-sm-right delete-button"
              onClick={this.onDeleteClick.bind(this)}>
              Delete post
          </button>

            <h1 className="single-post-title text-center">{post.title}</h1>

            <h2 className="single-post-category text-center"><em>Categories: {post.categories}</em></h2>

            <p className="single-post-content">{post.content}</p>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ posts }, ownProps) {
  // Instead of returning a big list of posts
  //return { posts };
  // We will return only the post that we realy care about
  // ownProps === this.props
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
