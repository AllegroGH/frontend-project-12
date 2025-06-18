import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import ChannelModal from './ChannelModal';

const ChannelDropdown = ({ channel }) => {
  const [showModal, setShowModal] = useState(null);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="light" className="p-0">
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShowModal('rename')}>
            Переименовать
          </Dropdown.Item>
          {channel.removable && (
            <Dropdown.Item
              onClick={() => setShowModal('remove')}
              className="text-danger"
            >
              Удалить
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      {showModal === 'rename' && (
        <ChannelModal
          mode="rename"
          channel={channel}
          onHide={() => setShowModal(null)}
        />
      )}

      {showModal === 'remove' && (
        <ChannelModal
          mode="remove"
          channel={channel}
          onHide={() => setShowModal(null)}
        />
      )}
    </>
  );
};

export default ChannelDropdown;
