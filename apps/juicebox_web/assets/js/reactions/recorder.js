/*global MediaRecorder*/

import React, { Component, PropTypes } from 'react';
import { delay } from 'lodash';
import VideoEncoder from './video-encoder';

class ReactionRecorder extends Component {
  render() {
    return (
      <div>
        <video ref={(video) => this.video = video}></video>
        <button onClick={_record.bind(this)}>Reaction!</button>
      </div>
    );
  }
}

ReactionRecorder.propTypes = {
  onRecord: PropTypes.func,
};

function _startRecording(stream) {
  const send = this.props.onRecord.bind(this);

  const encoder = new VideoEncoder();
  let mediaRecorder;

  if (typeof MediaRecorder.isTypeSupported == 'function'){
    let options;

    if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
      options = {mimeType: 'video/webm;codecs=h264'};
    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
      options = {mimeType: 'video/webm;codecs=vp9'};
    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
      options = {mimeType: 'video/webm;codecs=vp8'};
    }
    mediaRecorder = new MediaRecorder(stream, options);
  }else{
    mediaRecorder = new MediaRecorder(stream);
  }

  mediaRecorder.start(10);

  delay(() => { mediaRecorder.stop() }, 2500);

  var url = window.URL || window.webkitURL;
  this.video.src = url ? url.createObjectURL(stream) : stream;
  this.video.play();

  mediaRecorder.ondataavailable = function(e) {
    encoder.write(e.data);
  };

  let vid = this.video;

  mediaRecorder.onstop = function(){
    encoder.encode(function(video) {
      send(video);
    });

    vid.src = '';
    vid.stop();
  };
}

function _errorCallback() {
  // display warning to user
}

function _record(e) {
  e.preventDefault();
  const constraints = {
    'audio': false,
    'video': {
      'mandatory': {
        'minWidth': 320,
        'maxWidth': 320,
        'minHeight': 240,
        'maxHeight': 240
      },
      'optional': []
    }
  };
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  navigator.getUserMedia(constraints, _startRecording.bind(this), _errorCallback);
}

export default ReactionRecorder;