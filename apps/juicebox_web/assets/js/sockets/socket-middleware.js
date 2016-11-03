import { Socket } from 'phoenixjs';
import { defaults, omit, forEach } from 'lodash';
import { CONNECT_TO_CHANNEL } from '../sockets/actions';

const socket = (function() {
  let socket;

  return function() {
    if (!socket) {
      socket = new Socket('/stream');
      socket.connect();
    }

    return socket;
  }
}());

function connect(streamId) {
  const topic = `stream:${streamId}`;
  const channel = socket().channel(topic);

  channel.join()
    .receive('ok', resp => {
      console.log('Joined successfully', streamId, resp);
    })
    .receive('error', resp => { console.log('Unable to join', resp) });

  return channel;
}

function createSocket() {
  return ( { dispatch } ) => {
    let channel;

    return next => action => {
      const { socketData } = action;

      switch(action.type) {
        case CONNECT_TO_CHANNEL:
          channel && channel.leave();
          channel = connect(action.channel);
          channel.on('remote.action', action => dispatch(action));
        default:
          if (socketData) {
            channel && channel.push(socketData.event, socketData.payload);
            action = omit(action, 'socketData');
          }
      }

      return next(action);
    };
  }
}

export default createSocket;
