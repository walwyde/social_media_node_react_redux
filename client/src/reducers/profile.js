import {
  load_profile,
  profile_error,
  clear_profile,
  delete_education,
  delete_experience,
  delete_profile_error
} from "../actions/types";

const initialState = {
  profile: null,
  viewedProfiles: [],
  repos: [],
  loading: true,
  errors: {},
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case load_profile:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case profile_error:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case clear_profile:
      return {
        ...state,
        repos: [],
        loading: false,
      };
      case delete_profile_error:
        return {
          ...state,
          repos: [],
          loading: false,
          errors: payload
        };
    case delete_education:
    case delete_experience:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    default:
      return state;
  }
}
