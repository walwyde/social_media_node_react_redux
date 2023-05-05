import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deletePost, likePost, unlikePost } from "../../actions/post";

const PostItem = ({
  post: { name, avatar, date, user, _id, comments, likes, text },
  auth,
  deletePost,
  likePost,
  unlikePost,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          <Moment format="yyyy-mm-dd">{date}</Moment>
        </p>
        <button onClick={e => likePost(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          <span>{likes.length}</span>
        </button>
        <button onClick={e => unlikePost(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/comment/${_id}`} className="btn btn-primary">
          Discussion <span className="comment-count">{comments.length}</span>
        </Link>
        {auth.isAuthenticated && auth.user._id === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => {
              deletePost(_id);
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

export default connect(null, { deletePost,likePost,  unlikePost })(PostItem);
