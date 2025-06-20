import io from 'socket.io-client';
import { store } from './store';
import { apiSlice  } from './slices/apiSlice';
// import { useGetChannelsQuery } from '../slices/apiSlice';
import { setCurrentChannel } from './slices/chatSlice';

let socketInstance = null;

export const initSocket = (token) => {
  if (socketInstance) return;

  socketInstance = io('/', {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnection: true,
    // reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000    
  });

  socketInstance.on('disconnect', (reason) => {
    if (reason === 'io server disconnect') console.log('Сервер разорвал соединение');
  });

  // socketInstance.on('reconnect_failed', () => {
  //   console.error('Не удалось подключиться после всех попыток');
  // });

  socketInstance.on('newMessage', (message) => {
    store.dispatch(
      apiSlice.util.updateQueryData('getMessages', undefined, (draft) => {
        // console.log('socket.js:newMessage:: ', message);
        draft.push(message);
      })
    );
  });

  socketInstance.on('newChannel', (channel) => {
    store.dispatch(
      apiSlice.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel);
      })
    );
  });

  socketInstance.on('removeChannel', ({ id }) => {
    store.dispatch(
      apiSlice.util.updateQueryData('getChannels', undefined, (draft) => {
        return draft.filter(channel => channel.id !== id);
      })
    );
    
    // Переключение на general при удалении текущего
    const { currentChannelId } = store.getState().chat;
    if (currentChannelId === id) {
      // const {
      //   data: channels = [],
      // } = useGetChannelsQuery();
      // const generalChannel = channels.find((channel) => channel.name === 'general');
      // const newId = generalChannel ? generalChannel.id : '1';
      // store.dispatch(setCurrentChannel(newId));
      store.dispatch(setCurrentChannel('1'));
    }
  });

  socketInstance.on('renameChannel', ({ id, name }) => {
    store.dispatch(
      apiSlice.util.updateQueryData('getChannels', undefined, (draft) => {
        const channel = draft.find(c => c.id === id);
        if (channel) channel.name = name;
      })
    );
  });
};

export const disconnectSocket = () => {
  if (socketInstance) {
    // console.log('Disconnecting socket...');
    socketInstance.disconnect();
    socketInstance = null;
    // console.log('Socket disconnected');
  // } else {
  //   console.log('socketInstance is FALSY');
  }
};
