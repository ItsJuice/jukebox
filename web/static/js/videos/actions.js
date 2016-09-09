const ADD_VIDEO = 'ADD_VIDEO';
const QUEUE_UPDATED = 'QUEUE_UPDATED';

const VIDEO_SAMPLES = [
  'fd02pGJx0s0',
  'lbjZPFBD6JU',
  'ZBseZ6y7hDQ',
  'uTxythHY09k',
  'tO4dxvguQDk',
  '6hXH5gKIWEA',
  'gzC29VwE1A'
];

function sampleVideo() {
  return VIDEO_SAMPLES[Math.floor(Math.random() * VIDEO_SAMPLES.length)];
}

function addVideo() {
  return {
    type: ADD_VIDEO,
    socketData: {
      event: 'video.added:main',
      payload: {
        video_id: sampleVideo(), // pending: proper value from youtube
        duration: 30  // pending: proper value from youtube
      }
    }
  }
}

function queueUpdated(videos) {
  console.log('Queue updated');
  return {
    type: QUEUE_UPDATED,
    videos: videos.queue
  }
}

export {
  ADD_VIDEO,
  QUEUE_UPDATED,
  addVideo,
  queueUpdated,
};