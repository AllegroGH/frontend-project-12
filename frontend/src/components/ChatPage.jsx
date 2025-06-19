// import MessageList from './MessageList';

//   return (
//     <div className="container-fluid h-100">
//       <div className="row h-100">
//         <ChannelList channels={channels} />
//         <MessageList 
//           channelId={currentChannelId} 
//           channelName={channels.find(c => c.id === currentChannelId)?.name}
//         />
//       </div>
//     </div>
//   );
// };


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery, useGetMessagesQuery } from '../slices/apiSlice';
import { setCurrentChannel } from '../slices/chatSlice';
import ChannelList from './channels/ChannelList';
import MessageForm from './MessageForm';

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { currentChannelId } = useSelector((state) => state.chat);

  const {
    data: channels = [],
    isLoading: channelsLoading,
    error: channelsError,
  } = useGetChannelsQuery();

  const {
    data: messages = [],
    isLoading: messagesLoading,
    error: messagesError,
  } = useGetMessagesQuery();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (channels.length > 0 && !currentChannelId) {
      const generalChannel = channels.find((channel) => channel.name === 'general');
      const newId = generalChannel ? generalChannel.id : channels[0].id;
      dispatch(setCurrentChannel(newId));
    }
  }, [channels, currentChannelId, dispatch]);

  if (channelsLoading || messagesLoading) return <div>Загрузка...</div>;
  if (channelsError || messagesError) return <div>Error loading data</div>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="row h-100">
          <ChannelList channels={channels} />
        </div>

        <div className="col-8 d-flex flex-column h-100">
          <div className="flex-grow-1 overflow-auto mb-3">
            {messages
              .filter((m) => m.channelId === currentChannelId)
              .map((message) => (
                <div key={message.id} className="mb-2">
                  <strong>{message.username}:</strong> {message.body}
                </div>
              ))}
          </div>

          <MessageForm channelId={currentChannelId} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;