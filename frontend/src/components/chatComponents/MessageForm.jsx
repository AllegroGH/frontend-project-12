import React from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddMessageMutation } from '../../slices/apiSlice';
import { useFormik } from 'formik';

const MessageForm = React.forwardRef(({ channelId }, ref) => {
  const { username } = useSelector((state) => state.auth);
  const [addMessage] = useAddMessageMutation();
  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        await addMessage({ username, channelId, body: values.body });
        resetForm();
        inputRef.current?.focus();
      } catch (err) {
        console.error('Failed to send message:', err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input
          ref={inputRef}
          name="body"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2 form-control"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          type="submit"
          className="btn btn-group-vertical"
          disabled={!formik.values.body.trim() || isSubmitting}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-right-square"
          >
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
          </svg>
          <span className="visually-hidden">Отправить</span>
        </button>
      </div>
    </form>
  );
});

export default MessageForm;