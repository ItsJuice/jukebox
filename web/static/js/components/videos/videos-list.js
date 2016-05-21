import React, { Component } from 'react';
import Video from './video';

class VideoList extends Component {
  render() {
    const videos = this.props.videos;

    return (
      <div className="video-list">
        <h2>Videos</h2>
        {videos.map((videoId, index) => <Video key={index} videoId={videoId} />)}
      </div>
    );
  }
}

export default VideoList;
