import {
  get_posts,
  no_posts,
  post_deleted,
  update_likes,
  unLike_post,
  post_error,
  new_post
} from "../actions/types";

const initialState = {
  posts: [],
  loading: true,
  errors: {},
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
      case new_post:
        return {
          ...state,
          posts: [payload, ...state.posts],
          loading: false
        }
    case no_posts:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case post_deleted:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case update_likes:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case unLike_post:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case post_error:
      return {
        ...state,
        errors: payload,
        loading: false,
      };
    default:
      return state;
  }
}
