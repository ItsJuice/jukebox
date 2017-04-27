import {
  QUEUE_UPDATED,
  PLAYING_CHANGED,
  RECEIVE_TERM,
  RECEIVE_RESULTS,
  TOGGLE_EXPANDED,
  VOTED_DOWN,
  VOTED_UP,
} from './actions';

const initialState = {
  expanded: true,
  votes: {}
};

function vote(state, videoId, direction) {
  let { votes } = state;

  const vote = votes[videoId];
  if (vote !== direction) {
    votes = Object.assign({}, votes, { [videoId]: direction });
  }

  return Object.assign({}, state, { votes });
}

function videos(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TERM:
      return state;
    case RECEIVE_RESULTS:
      return Object.assign({}, state, { results: action.payload });
    case QUEUE_UPDATED:
      return Object.assign({}, state, { queue: action.videos });
    case PLAYING_CHANGED:
      return Object.assign({}, state,
        {
          playing: action.playing && action.playing.video,
          playingStartTime: action.time || 0,
          playingUpdated: (new Date()).getTime()
        });
    case TOGGLE_EXPANDED:
      return Object.assign({}, state, { expanded: !state.expanded });
    case VOTED_DOWN:
      return vote(state, action.videoId, false);
    case VOTED_UP:
      return vote(state, action.videoId, true);
    default:
      return state;
  }
}

export {
  videos
}
