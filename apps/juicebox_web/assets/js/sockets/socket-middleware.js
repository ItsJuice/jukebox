import { Socket } from 'phoenixjs';
import { defaults, omit, forEach } from 'lodash';

const defaultOptions = {};

function createChannel(dispatch, options, channelName) {
  const socket = new Socket(options.socketURL);
  socket.connect();
  const channel = socket.channel(channelName, {});
  channel.join()
    .receive('ok', resp => { 
      console.log('Joined successfully', channelName, resp);
      if (options.connectAction) {
        dispatch(options.connectAction(resp));
      }
    })
    .receive('error', resp => { console.log('Unable to join', resp) });
  return channel;
}

export function createSocket(opts = {}) {
  const options = defaults(opts, defaultOptions);

  return ( { dispatch } ) => {
    let channel = joinStream(options.channelName);

    function joinStream(streamId) {
      const channel = createChannel(dispatch, options, streamId);

      forEach(opts.actions, (action, eventName) => {
        channel.on(eventName, payload => {
          dispatch(action(payload));
        });
      });

      return channel;
    }

    return next => action => {
      const { socketData } = action;

      if (socketData) {
        const streamId = `stream:${socketData.payload.stream_id}`;
        if (channel.topic !== streamId) {
          channel.socket.disconnect();
          channel = joinStream(streamId);
        }

        channel.push(socketData.event, socketData.payload);
        action = omit(action, 'socketData');
      }

      return next(action);
    };
  }
}

export default createSocket;
