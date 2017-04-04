import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { sendReaction } from './actions';
import ReactionRecorder from './recorder';
import VideoFrame from './video-frame';
import FrameSelector from './frame-selector';
import { FRAMES } from './frames';
import styles from './styles.scss';

class Reactions extends Component {
  constructor(props) {
    super(props);
    this.state = { frame: FRAMES[0] };
    this.send = _send.bind(this);
    this.onFrameChange = _onFrameChange.bind(this);
  }

  reactions() {
    return map(this.props.reactions, ({ video, frame }, userId) => {
      return <VideoFrame src={video}
                         frame={frame}
                         key={userId}
                         className={ styles['video-frame'] } />
    });
  }

  render() {
    return (
      <div>
        <h2>Reactions</h2>
        <div className={ styles['reactions-container']}>
          <ReactionRecorder
            onRecord={ this.send }
            frame={ this.state.frame }
            styles={ styles }
          />
          <FrameSelector onChange={ this.onFrameChange }
                         className={ styles['frame-selector'] } />
          <div className={ styles.reactions }>
            { this.reactions() }
          </div>
        </div>
      </div>
    );
  }
}

Reactions.propTypes = {
  reactions: PropTypes.shape({
    video: PropTypes.string,
    userId: PropTypes.string,
    frame: PropTypes.string,
  }),
};

function _onFrameChange(frame) {
  this.setState({ frame });
}

function _send(video) {
  this.props.sendReaction({
    streamId: this.props.streamId,
    frame: this.state.frame,
    video
  });
}

function mapStateToProps(state) {
  return {
    reactions: state.reactions
  }
}

export default connect(mapStateToProps, { sendReaction })(Reactions);
