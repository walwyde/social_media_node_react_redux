import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getPost,
  addComment,
  deleteComment,
  deletePost,
  likePost,
  unlikePost,
} from "../../actions/post";
import { Spinner } from "../layouts/Spinner";
import PostItem from "./PostItem";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const Post = ({
  getPost,
  post: { post, loading },
  match,
  auth,
  addComment,
  deleteComment,
  deletePost,
  likePost,
  unlikePost,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, []);
  return loading || post === null || post === undefined ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to={"/posts"} className="btn">
        Back To Posts
      </Link>

      {auth.isAuthenticated && post.user === auth.user._id && (
        <Link to={`/edit/post/${post._id}`} className={"btn"}>
          Edit This Post
        </Link>
      )}

      <PostItem
        post={post}
        auth={auth}
        showActions={false}
        deleteComment={deleteComment}
        deletePost={deletePost}
        likePost={likePost}
        unlikePost={unlikePost}
      />

      <CommentForm addComment={addComment} post={post} />

      {post.comments.length > 0 &&
        post.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            auth={auth}
            post={post}
            deleteComment={deleteComment}
          />
        ))}
    </Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPost,
  addComment,
  deleteComment,
  deletePost,
  likePost,
  unlikePost,
})(Post);
