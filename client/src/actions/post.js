import {
  get_posts,
  no_posts,
  new_post,
  post_error,
  post_deleted,
  unLike_post,
  update_likes,
  no_post,
  get_post,
  new_comment,
  comment_error,
  delete_comment,
  update_post
} from "./types";
import { setAlert } from "./setAlert";
import axios from "axios";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: get_posts,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: no_posts,
      payload: error.response,
    });
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: get_post,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: no_post,
      payload: error.response,
    });
  }
};

export const newPost =
  (data, postId = null, edit = false) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res =
        edit === false
          ? await axios.post("/api/posts", data, config)
          : await axios.put(`/api/posts/${postId}`, data, config);

      dispatch({
        type: edit === false ? new_post : update_post,
        payload: res.data,
      });
      dispatch(setAlert(edit === false ? `Your Post Has Been Created!` : `Your Post Has Been Edited`, "success"));
    } catch (error) {
      setAlert("Something Went Wrong!!", "danger");

      dispatch({
        type: post_error,
        payload: error.response,
      });
    }
  };

export const deletePost = (_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${_id}`);

    dispatch({
      type: post_deleted,
      payload: _id,
    });

    dispatch(setAlert("Post Deleted!", "danger"));
  } catch (err) {
    dispatch({
      type: post_error,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const likePost = (_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/likes/${_id}`);

    dispatch({
      type: update_likes,
      payload: {
        id: _id,
        likes: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: post_error,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const unlikePost = (_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${_id}`);

    dispatch({
      type: unLike_post,
      payload: {
        id: _id,
        likes: res.data.likes,
      },
    });
  } catch (err) {
    dispatch({
      type: post_error,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const addComment = (data, postId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/posts/comments/${postId}`, data, config);

    dispatch({
      type: new_comment,
      payload: {
        comments: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: comment_error,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}/comments/${commentId}`);

    dispatch({
      type: delete_comment,
      payload: commentId,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: comment_error,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
