import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { getPost, newPost } from "../../actions/post";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "../layouts/Spinner";

const Editpost = ({ post: { loading, post }, match, newPost, getPost }) => {
  const [text, setFormData] = useState("");

  useEffect(() => {
    getPost(match.params.id);
    loading === false &&
      post &&
      setFormData(loading || !post.text ? "" : post.text);
  }, []);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to={`/post/${post._id}`} className={"btn"}>
        Back To Post
      </Link>
      <div
        className="post-form"
        onSubmit={(e) => {
          e.preventDefault();
          newPost({ text }, post._id, true);
          setFormData("");
        }}
      >
        <div className="bg-primary ">
          <h3>Edit Post</h3>
        </div>
        <form className="form my-1">
          <textarea
            value={text}
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            onChange={(e) => {
              setFormData(e.target.value);
            }}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </Fragment>
  );
};

Editpost.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  newPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost, newPost })(Editpost);
