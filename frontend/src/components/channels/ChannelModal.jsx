import { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import { useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation } from '../../slices/apiSlice';
import { toast } from 'react-toastify';

const ChannelModal = ({ mode, channel, onHide }) => {
  const inputRef = useRef(null);

  const [addChannel] = useAddChannelMutation();
  const [removeChannel] = useRemoveChannelMutation();
  const [renameChannel] = useRenameChannelMutation();

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
      .max(20, 'От 3 до 20 символов'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldTouched }) => {
    setFieldTouched('name', true);
    try {
      if (mode === 'add') {
        await addChannel(values).unwrap();
        toast.success('Канал создан');
      } else if (mode === 'rename') {
        await renameChannel({ id: channel.id, ...values }).unwrap();
        toast.success('Канал переименован');
      }
      onHide();
    } catch (err) {
      console.error('Ошибка:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async () => {
    await removeChannel(channel.id).unwrap();
    toast.success('Канал удалён');
    onHide();
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
          {({ isSubmitting, errors, touched }) => (
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
                  <Button variant="secondary" className="me-2" onClick={onHide}>
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
              <Button variant="secondary" className="me-2" onClick={onHide}>
                Отменить
              </Button>
              <Button variant="danger" onClick={handleRemove}>
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
