import _ from 'lodash';

import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      // Drop the post id that doesn't available anymore
      // Update local network
      return _.omit(state, action.payload);

    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;
      return { ...state, [action.payload.data.id]: action.payload.data };

    case FETCH_POSTS:
      // Turns [ {id: , title: }, { id: , title: } ] to { id: { id:, title: }, id: { id: , title: } }
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
