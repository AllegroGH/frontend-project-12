import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery, useGetMessagesQuery } from '../slices/apiSlice';
import { setCurrentChannel } from '../slices/chatSlice';
import ChannelList from './chatComponents/ChannelList';
import MessageForm from './chatComponents/MessageForm';

const ChatPage = () => {
  const messageFormRef = useRef(null);
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

  const currentChannel = channels.find(c => c.id === currentChannelId);
  const channelMessages = messages.filter(m => m.channelId === currentChannelId);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const container = document.getElementById('messages-box');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
    messageFormRef.current?.focus();
  }, [channelMessages]);

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
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelList channels={channels} />

        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># {currentChannel?.name}</b></p>
              <span className="text-muted">{channelMessages.length} сообщени(я/й)</span>
            </div>

            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {channelMessages.map((message) => (
                <div key={message.id} className="text-break mb-2">
                  <b>{message.username}</b>: {message.body}
                </div>
              ))}
            </div>

            <div className="mt-auto px-5 py-3">
              <MessageForm ref={messageFormRef} channelId={currentChannelId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;