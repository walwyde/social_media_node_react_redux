import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Comment = ({
  comment: { user, name, text, date, _id, avatar },
  auth,
  post,
  deleteComment,
}) => {
  return (
    <div className="comments">
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
            Posted on <Moment format={"yyyy/mm/dd"}>{date}</Moment>
          </p>
        </div>
        {auth.isAuthenticated && auth.user._id === user && (
          <button
            type="button"
            class="btn btn-danger"
            onClick={(e) => {
              e.preventDefault()
              deleteComment(post._id, _id);
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default Comment;
