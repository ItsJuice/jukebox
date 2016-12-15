const ADD_VIDEO = 'ADD_VIDEO';
const LOAD_STATE = 'ADD_VIDEO';
const QUEUE_UPDATED = 'QUEUE_UPDATED';
const RECEIVE_TERM = 'RECEIVE_TERM';

const VIDEO_SAMPLES = [
  'fd02pGJx0s0',
  'lbjZPFBD6JU',
  'ZBseZ6y7hDQ',
  'uTxythHY09k',
  'tO4dxvguQDk',
  '6hXH5gKIWEA',
  'gzC29VwE1A',
];

function sampleVideo() {
  return VIDEO_SAMPLES[Math.floor(Math.random() * VIDEO_SAMPLES.length)];
}

function receiveResults(results) {
  return {
    type: RECEIVE_RESULTS,
    payload: results,
  };
}

function receiveTerm({ term }) {
  console.log('term', term);
  return dispatch => {
    fetch(`http://juiceboxapp-staging.herokuapp.com/api/videos?q=${term}`, {
      method: 'get',
      mode: 'cors',
      headers: new Headers({
        'Access-Control-Origin': '*',
        'Content-Type': 'multipart/form-data',
      }),
    }).then(function(response) {
      console.log('success', response);
      dispatch(receiveResults(response));
    }).catch(function(error) {
      console.log('error', error);
    });
  };
}

function addVideo({ streamId }) {
  return {
    type: ADD_VIDEO,
    socketData: {
      event: 'video.added',
      payload: {
        stream_id: streamId,
        video: {
          video_id: sampleVideo(), // pending: proper value from youtube
          duration: 30000,         // pending: proper value from youtube
        }
      }
    }
  };
}

function loadInitialState() {
  return {
    type: LOAD_STATE,
    socketData: {
      event: 'video.getState',
      payload: {
        stream_id: 'main',
      }
    }
  };
}

function queueUpdated(videos) {
  return {
    type: QUEUE_UPDATED,
    videos: videos.queue
  };
}

export {
  ADD_VIDEO,
  QUEUE_UPDATED,
  RECEIVE_TERM,
  receiveTerm,
  addVideo,
  queueUpdated,
  loadInitialState,
};
