import io from 'socket.io-client';
import { store } from './store';
import { apiSlice  } from './slices/apiSlice';

let socketInstance = null;

export const initSocket = (token) => {
  if (socketInstance) return;

  socketInstance = io('/', {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    },
  });

  socketInstance.on('disconnect', (reason) => {
    if (reason === 'io server disconnect') console.log('Сервер разорвал соединение');
  });

  socketInstance.on('reconnect_failed', () => {
    console.error('Не удалось подключиться после всех попыток');
  });

  socketInstance.on('newMessage', (message) => {
    store.dispatch(
      apiSlice.util.updateQueryData('getMessages', undefined, (draft) => {
        // console.log('socket.js:newMessage:: ', message);
        draft.push(message);
      })
    );
  });
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};


// let socket;

// export const initSocket = (token) => {
//   socket = io('/', {
//     extraHeaders: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   socket.on('newMessage', (message) => {
//     store.dispatch(
//       apiSlice.util.updateQueryData('getMessages', undefined, (draft) => {
//         console.log('socket.js:newMessage:: ', message);
//         draft.push(message);
//       })
//     );
//   });

//   // socket.on('newChannel', (channel) => {
//   //   store.dispatch(
//   //     apiSlice.util.updateQueryData('getChannels', undefined, (draft) => {
//   //       draft.push(channel);
//   //     })
//   //   );
//   // });
// };

// export const getSocket = () => socket;