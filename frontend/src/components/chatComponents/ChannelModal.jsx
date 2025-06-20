import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation } from '../../slices/apiSlice';
// import { useGetMessagesQuery, useRemoveMessageMutation } from '../../slices/apiSlice';
import { setCurrentChannel } from '../../slices/chatSlice';

const ChannelModal = ({ mode, channel, channels, onHide }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addChannel] = useAddChannelMutation();
  const [removeChannel] = useRemoveChannelMutation();
  const [renameChannel] = useRenameChannelMutation();
  // const [removeMessage] = useRemoveMessageMutation();

  // const {
  //   data: messages = [],
  // } = useGetMessagesQuery();

  useEffect(() => {
    if (inputRef.current && mode !== 'remove') {
      const timer = setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.select();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [mode]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test(
        'unique-channel',
        'Должно быть уникальным',
        (value) => {
          if (!value || mode === 'remove') return true;
          const channelExists = channels.some((c) => c.name === value);
          // if (mode === 'rename' && value === channel.name) return true;
          return !channelExists;
        }
      ),
  });

  const handleSubmit = async (values, { setFieldTouched }) => {
    setFieldTouched('name', true);
    try {
      if (mode === 'add') {
        setIsSubmitting(true);
        const newChannel = await addChannel(values).unwrap();
        dispatch(setCurrentChannel(newChannel.id));
        toast.success('Канал создан');
      } else if (mode === 'rename') {
        setIsSubmitting(true);
        await renameChannel({ id: channel.id, ...values }).unwrap();
        toast.success('Канал переименован');
      }
      onHide();
    } catch (err) {
      console.error('Ошибка добавления/изменения канала:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async () => {
    try {
      setIsSubmitting(true);
      await removeChannel(channel.id).unwrap();
      // const messagesToDelete = messages.filter((m) => m.channelId === channel.id);
      // messagesToDelete.forEach(async (m) => {
      //   await removeMessage(m.id).unwrap();
      // });
      // console.log(messagesToDelete);
      // console.log(messages);
      toast.success('Канал удалён');
      onHide();
    } catch (err) {
      console.error('Ошибка удаления канала:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'add' && 'Добавить канал'}
          {mode === 'remove' && 'Удалить канал'}
          {mode === 'rename' && 'Переименовать канал'}
        </Modal.Title>
      </Modal.Header>

      {mode !== 'remove' ? (
        <Formik
          initialValues={{ name: channel?.name || '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {({ errors, touched }) => (
            <Form>
              <Modal.Body>
                <Field
                  name="name"
                  className={`mb-2 form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                  // autoFocus // -- не работает, поэтому через useRef
                  innerRef={inputRef}
                />
                {errors.name && touched.name && (
                  <div className="invalid-feedback d-block">
                    {errors.name}
                  </div>
                )}
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="me-2" onClick={onHide} disabled={isSubmitting}>
                    Отменить
                  </Button>
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                  </Button>
                </div>
              </Modal.Body>
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          <Modal.Body>
            <p className="lead">Уверены?</p>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={onHide} disabled={isSubmitting}>
                Отменить
              </Button>
              <Button variant="danger" onClick={handleRemove} disabled={isSubmitting}>
                Удалить
              </Button>
            </div>
          </Modal.Body>
        </div>
      )}
    </Modal>
  );
};

export default ChannelModal;
