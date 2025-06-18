import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '../../slices/chatSlice';
import ChannelDropdown from './ChannelDropdown';
import { useState } from 'react';
import ChannelModal from './ChannelModal';

const ChannelList = ({ channels }) => {
  const dispatch = useDispatch();
  // const { channels } = useSelector(state => state.chat);
  const { currentChannelId } = useSelector(state => state.chat);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="col-4 border-end px-0">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          +
        </button>
      </div>

      <ul className="nav flex-column">
        {channels.map(channel => (
          <li key={channel.id} className="nav-item w-100">
            <div
              className={`nav-link w-100 text-start btn ${channel.id === currentChannelId ? 'active' : ''
                }`}
              onClick={() => dispatch(setCurrentChannel(channel.id))}
            >
              <span className="me-1">#</span>
              {channel.name}
              {channel.id === currentChannelId && (
                <span className="float-end">
                  <ChannelDropdown channel={channel} />
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {showAddModal && (
        <ChannelModal
          mode="add"
          channel={{ name: '' }}
          onHide={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default ChannelList;