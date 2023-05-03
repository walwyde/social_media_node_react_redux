import { get_posts, no_posts, new_post, post_error } from "./types";
import { setAlert } from "./setAlert";
import axios from "axios";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    console.log(res);

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
      }
    }
    try {

      const res = await axios.post('/api/posts', data, options)

      history.push('/posts')

      dispatch({
        type: new_post,
        payload: res.data
      })
      dispatch(
        setAlert('Your Post Has Been Created!', 'success')
      )
    } catch (error) {
      setAlert('Something Went Wrong!!', 'danger')

      dispatch({
        type: post_error,
        payload: error.response
      })
    }
  };
