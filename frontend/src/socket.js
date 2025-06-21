import io from 'socket.io-client'
import { store } from './store'
import { apiSlice } from './slices/apiSlice'
import { setCurrentChannel } from './slices/chatSlice'

let socketInstance = null

export const initSocket = (token) => {
  if (socketInstance) return

  socketInstance = io('/', {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
  })

  socketInstance.on('newMessage', (message) => {
    store.dispatch(
      apiSlice.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(message)
      }),
    )
  })

  socketInstance.on('newChannel', (channel) => {
    store.dispatch(
      apiSlice.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel)
      }),
    )
  })

  socketInstance.on('removeChannel', ({ id }) => {
    store.dispatch(
      apiSlice.util.updateQueryData('getChannels', undefined, (draft) => {
        return draft.filter(channel => channel.id !== id)
      }),
    )

    // Переключение на general (id = '1')
    const { currentChannelId } = store.getState().chat
    if (currentChannelId === id) {
      store.dispatch(setCurrentChannel('1'))
    }
  })

  socketInstance.on('renameChannel', ({ id, name }) => {
    store.dispatch(
      apiSlice.util.updateQueryData('getChannels', undefined, (draft) => {
        const channel = draft.find(c => c.id === id)
        if (channel) channel.name = name
      }),
    )
  })
}

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect()
    socketInstance = null
  }
}
