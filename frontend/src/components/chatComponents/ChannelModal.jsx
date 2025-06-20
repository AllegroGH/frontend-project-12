import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation } from '../../slices/apiSlice';
// import { useGetMessagesQuery, useRemoveMessageMutation } from '../../slices/apiSlice';
import { setCurrentChannel } from '../../slices/chatSlice';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';

const ChannelModal = ({ mode, channel, channels, onHide }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

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
      .required(t('validation.requiredField'))
      .min(3, t('validation.min3max20'))
      .max(20, t('validation.min3max20'))
      .test(
        'unique-channel',
        (params) => {
          if (params.originalValue && leoProfanity.check(params.originalValue)) return t('validation.mustBeCleanUnique');
          return t('validation.mustBeUnique');
        },
        (value) => {
          if (!value || mode === 'remove') return true;
          const channelExists = channels.some((c) => c.name === leoProfanity.clean(value));
          // if (mode === 'rename' && value === channel.name) return true;
          return !channelExists;
        }
      ),
  });

  const handleSubmit = async (values, { setFieldTouched }) => {
    setFieldTouched('name', true);
    try {
      const cleanValues = { name: leoProfanity.clean(values.name) }
      if (mode === 'add') {
        setIsSubmitting(true);
        const newChannel = await addChannel(cleanValues).unwrap();
        dispatch(setCurrentChannel(newChannel.id));
        toast.success(t('chatServer.channelAdded'));
      } else if (mode === 'rename') {
        setIsSubmitting(true);
        await renameChannel({ id: channel.id, ...cleanValues }).unwrap();
        toast.success(t('chatServer.channelRenamed'));
      }
      onHide();
    } catch (err) {
      console.error(t('chatServer.addOrRenameChannelError'), err);
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
      toast.success(t('chatServer.channelRemoved'));
      onHide();
    } catch (err) {
      console.error(t('chatServer.removeChannelError'), err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'add' && t('chat.channelModal.addTitle')}
          {mode === 'rename' && t('chat.channelModal.renameTitle')}
          {mode === 'remove' && t('chat.channelModal.removeTitle')}
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
                    {t('chat.channelModal.cancelButton')}
                  </Button>
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? t('chat.channelModal.sendButtonInProgress') : t('chat.channelModal.sendButton')}
                  </Button>
                </div>
              </Modal.Body>
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          <Modal.Body>
            <p className="lead">{t('chat.channelModal.confirmRemoveQuestion')}</p>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={onHide} disabled={isSubmitting}>
                {t('chat.channelModal.cancelButton')}
              </Button>
              <Button variant="danger" onClick={handleRemove} disabled={isSubmitting}>
                {t('chat.channelModal.removeButton')}
              </Button>
            </div>
          </Modal.Body>
        </div>
      )}
    </Modal>
  );
};

export default ChannelModal;
