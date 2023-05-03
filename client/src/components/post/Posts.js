import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Spinner } from "../layouts/Spinner";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import PostItem from "./PostItem";

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      {posts.length > 0 ? 
        posts.map(post => (
        <Fragment>
          <div className="posts">
            <PostItem post={post} />
          </div>
        </Fragment>
        ))
       : (
        <Fragment>No Posts Here Yet</Fragment>
      )}
    </section>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
