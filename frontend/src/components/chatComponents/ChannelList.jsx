import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '../../slices/chatSlice';
import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import ChannelModal from './ChannelModal';
import { useTranslation } from 'react-i18next';

const ChannelList = ({ channels }) => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector(state => state.chat);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentChannel, setCurrentChannelData] = useState(null);
  const { t } = useTranslation();

  const handleShowModal = (mode, channel = null) => {
    setModalMode(mode);
    setCurrentChannelData(channel);
    setShowModal(true);
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channelList.title')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => handleShowModal('add')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-square"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>

      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(channel => (
          channel.removable ? (
            <li key={channel.id} className="nav-item w-100">
              <div role="group" className="d-flex dropdown btn-group">
                <button
                  type="button"
                  className={`w-100 rounded-0 text-start text-truncate btn ${channel.id === currentChannelId ? 'btn-secondary' : ''}`}
                  onClick={() => dispatch(setCurrentChannel(channel.id))}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
                <Dropdown>
                  <Dropdown.Toggle
                    as="button" // чтобы сбросить стили по умолчанию, т.к. по умолчанию bootstrap "навешивает" btn-primary
                    split
                    id={`channel-dropdown-${channel.id}`}
                    className={`flex-grow-0 dropdown-toggle-split btn ${channel.id === currentChannelId ? 'btn-secondary' : 'btn-light bg-transparent'}`}
                    style={{
                      borderTopLeftRadius: '0',
                      borderBottomLeftRadius: '0',
                      marginLeft: '-1px'
                    }}
                  >
                    <span className="visually-hidden">{t('chat.channelList.itemDropdown')}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleShowModal('rename', channel)}>
                      {t('chat.channelList.itemDropdownRename')}
                    </Dropdown.Item>
                    {channel.removable && (
                      <Dropdown.Item
                        onClick={() => handleShowModal('remove', channel)}
                        className="text-danger"
                      >
                        {t('chat.channelList.itemDropdownRemove')}
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li>
          ) : (
            <li key={channel.id} className="nav-item w-100">
              <button
                type="button"
                className={`w-100 rounded-0 text-start text-truncate btn ${channel.id === currentChannelId ? 'btn-secondary' : ''}`}
                onClick={() => dispatch(setCurrentChannel(channel.id))}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
            </li>
          )
        ))}
      </ul>

      {
        showModal && (
          <ChannelModal
            mode={modalMode}
            channel={currentChannel || { name: '' }}
            channels={channels}
            onHide={() => setShowModal(false)}
          />
        )
      }
    </div >
  );
};

export default ChannelList;



