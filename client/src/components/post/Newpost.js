import React, { useState } from "react";
import PropTypes from "prop-types";
import { newPost } from "../../actions/post";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Newpost = ({ newPost, history }) => {
  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          newPost({text}, history);
          setText(' ');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

Newpost.propTypes = {
  newPost: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { newPost })(withRouter(Newpost));
