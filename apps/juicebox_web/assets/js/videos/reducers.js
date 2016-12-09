import { QUEUE_UPDATED } from './actions';
import { SEARCH } from './actions';
import { cloneDeep } from 'lodash';

function videos(state = [], action = {}) {
  switch (action.type) {
    case SEARCH:
      // Call API..
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
