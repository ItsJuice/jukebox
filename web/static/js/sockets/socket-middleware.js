import { Socket } from 'phoenixjs';
import { defaults, omit, forEach } from 'lodash';

const defaultOptions = {};

export default function createSocket(opts = {}) {
  let socket;
  let channel;
  const options = defaults(opts, defaultOptions);

  return store => {
    socket = new Socket(options.socketURL);
    socket.connect();
    channel = socket.channel(options.channelName, {});
    channel.join()
      .receive('ok', resp => { console.log('Joined successfully', resp) })
      .receive('error', resp => { console.log('Unable to join', resp) });

    forEach(opts.actions, (action, eventName) => {
      channel.on(eventName, payload => {
        store.dispatch(action(payload));
      });
    });

    return next => action => {
      const { socketData } = action;

      if (socketData) {
        channel.push(socketData.event, socketData.payload);
        action = omit(action, 'socketData');
      }

      return next(action);
    };
  }
}

export default createSocket;