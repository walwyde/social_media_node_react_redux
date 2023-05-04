import { get_posts, no_posts, post_deleted } from "../actions/types";

const initialState = {
  posts: [],
  loading: true,
  errors: {}
};

export default function post(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case get_posts:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case no_posts:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
      case post_deleted:
        return {
          ...state,
          loading: false
        }
      default:
        return state
  }
}
