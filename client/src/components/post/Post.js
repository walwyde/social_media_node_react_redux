import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost, addComment, deleteComment } from "../../actions/post";
import { Spinner } from "../layouts/Spinner";
import PostItem from "./PostItem";
import CommentItem from "./CommentItem";
// import { addComment } from "../../actions/post";
import CommentForm from "./CommentForm";

const Post = ({
  getPost,
  post: { post, loading },
  match,
  auth,
  addComment,
  deleteComment,
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

      <PostItem post={post} auth={auth} showActions={false} />

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
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost, addComment, deleteComment })(
  Post
);
