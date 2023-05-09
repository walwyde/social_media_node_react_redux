import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Spinner } from "../layouts/Spinner";
import {
  getPosts,
  deletePost,
  newPost,
  likePost,
  unlikePost,
} from "../../actions/post";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import Newpost from "../post/Newpost";

const Posts = ({
  getPosts,
  post: { posts, loading },
  auth,
  deletePost,
  newPost,
  likePost,
  unlikePost
}) => {
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <section className="container">
      <Newpost newPost={newPost} />
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <PostItem
                key={post._id}
                post={post}
                auth={auth}
                showActions={true}
                deletePost={deletePost}
                likePost={likePost}
                unlikePost={unlikePost}
              />
            ))
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
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  newPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPosts,
  deletePost,
  newPost,
  likePost,
  unlikePost,
})(Posts);
