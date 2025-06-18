import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddMessageMutation } from '../slices/apiSlice';

const MessageForm = ({ channelId }) => {
  const [message, setMessage] = useState('');
  const { username } = useSelector((state) => state.auth);
  const [addMessage] = useAddMessageMutation();

  // console.log('MessageForm:username:: ', username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setMessage('');
      return;
    }

    try {
      await addMessage({
        body: message,
        channelId,
        username,
      }).unwrap();
      setMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-auto">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button className="btn btn-primary" type="submit">
          Отправить
        </button>
      </div>
    </form>
  );
};

export default MessageForm;