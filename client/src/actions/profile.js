import axios from "axios";
import {
  load_profile,
  load_profiles,
  profile_error,
  delete_experience,
  delete_education,
  delete_account,
  clear_profile,
  delete_profile_error,
  get_repos,
} from "./types";
import { setAlert } from "../actions/setAlert";

export const loadCurrentProfile = () => async (dispatch) => {
  dispatch({
    type: clear_profile
  })
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: load_profile,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: profile_error,
    });
  }
};

export const createProfile =
  (profiledata, history, edit = false) =>
  async (dispatch) => {
    const options = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    const body = JSON.stringify(profiledata);
    try {
      const res = edit
        ? await axios.put("api/profile/me", body, options)
        : await axios.post("/api/profile/me", body, options);

      console.log(res);

      if (!edit) history.push("/dashboard");

      dispatch({
        type: load_profile,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? `Profile Updated` : "Profile Created", "success")
      );
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;

      if (errors)
        return errors.forEach((error) =>
          dispatch(setAlert(error.msg, "danger"))
        );
      console.log(err.response);
      dispatch({
        type: profile_error,
      });
      dispatch(setAlert(err.response.data, "danger"));
    }
  };
export const addEdu = (data, history) => async (dispatch) => {
  const options = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.put("api/profile/education", body, options);

    history.push("/dashboard");

    console.log(data);

    dispatch({
      type: load_profile,
      payload: res.data,
    });
    dispatch(setAlert("Profile Education Added", "success"));
  } catch (err) {
    dispatch(setAlert(err.statusText, "danger"));
  }
};

export const getProfiles = () => async (dispatch) => {
  try {
    dispatch({
      type: clear_profile,
    });

    const res = await axios.get("api/profile/users");
    // const data = JSON.parse(res);
    console.log(res)

    dispatch({
      type: load_profiles,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)

    dispatch({
      type: profile_error,
      payload: err.response,
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`api/profile/${userId}`);
    const profile = JSON.parse(response);

    dispatch({
      type: load_profile,
      payload: profile,
    });
  } catch (err) {
    dispatch({
      type: profile_error,
      payload: err.response.data,
    });
  }
};

export const getRepos = (username) => async (dispatch) => {
  try {
    const data = await axios.get(`/api/github/${username}`);

    const repos = await JSON.parse(data);

    dispatch({
      type: get_repos,
      payload: repos,
      loading: false,
    });
  } catch (err) {
    dispatch({
      type: profile_error,
      payload: err.response.data,
    });
  }
};
export const addExp = (data, history) => async (dispatch) => {
  const options = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.put("api/profile/experience", body, options);

    history.push("/dashboard");

    console.log(history, res);

    dispatch({
      type: load_profile,
      payload: res.data,
    });
    dispatch(setAlert("Profile Experience Added", "success"));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: profile_error,
      payload: err.response.data.statusText,
    });
    dispatch(setAlert(err.statusText, "danger"));
  }
};

export const deleteExperience = (exp_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${exp_id}`);
    console.log(res);
    dispatch({
      type: delete_experience,
      payload: res.data,
    });
    dispatch(setAlert("Experience Deleted", "success"));
  } catch (err) {
    dispatch(setAlert(err.response.data, "danger"));
  }
};

export const deleteEducation = (edu_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${edu_id}`);

    dispatch({
      type: delete_education,
      payload: res.data,
    });
    dispatch(setAlert("Education Deleted", "success"));
  } catch (err) {
    dispatch(setAlert(err.response.data, "danger"));
  }
};
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile/me");

      dispatch({
        type: delete_account,
      });
      dispatch({
        type: clear_profile,
      });
      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch(setAlert(err.response.data, "danger"));
      dispatch({
        type: delete_profile_error,
        errors: err.response.data,
      });
    }
  }
};
