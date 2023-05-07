import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Spinner } from "../layouts/Spinner";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import {deletePost} from "../../actions/post";
import Newpost from '../post/Newpost'


const Posts = ({ getPosts, post: { posts, loading }, auth, deletePost }) => {
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <section className="container">
      < Newpost />
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post, index) => <PostItem key={post._id} post={post} auth={auth} />)
          ) : (
            <Fragment>No Posts Here Yet</Fragment>
          )}
        </div>
      )}
    </section>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts, deletePost })(Posts);
