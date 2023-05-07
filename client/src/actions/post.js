import { 
  get_posts, 
  no_posts, 
  new_post,
  post_error,
  post_deleted,
  unLike_post,
  update_likes,
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

export const newPost =
  (data, history, edit = false) =>
  async (dispatch) => {
    const options = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const body =  JSON.stringify(data)
    try {
      const res = await axios.post("/api/posts", body, options);

      console.log(body)
      history.push("/posts");

      dispatch({
        type: new_post,
        payload: res.data,
      });
      dispatch(setAlert("Your Post Has Been Created!", "success"));
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
      payload: {msg: err.response.statusText, status: err.response.status}
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
      payload: {msg: err.response.statusText, status: err.response.status}
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
        likes: res.data,
      },
    });

  } catch (err) {


    dispatch({
      type: post_error,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};
