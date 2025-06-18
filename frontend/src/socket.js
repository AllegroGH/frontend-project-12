import io from 'socket.io-client';
import { store } from './store';
import { apiSlice  } from './slices/apiSlice';

let socketInstance = null;

export const initSocket = (token) => {
  if (socketInstance) return;

  socketInstance = io('/', {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
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