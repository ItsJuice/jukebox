import { QUEUE_UPDATED } from './actions';
import { RECEIVE_TERM } from './actions';
import { cloneDeep } from 'lodash';

function videos(state = [], action = {}) {
  switch (action.type) {
    case RECEIVE_TERM:
      return state;
    case QUEUE_UPDATED:
      return cloneDeep(action.videos);
    default:
      return state;
  }
}

export {
  videos
}
