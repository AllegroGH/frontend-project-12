import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { setCredentials } from '../slices/authSlice';

const Login = () => {
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('это обязательное поле'),
    password: Yup.string().required('это обязательное поле').min(5, 'Пароль должен содержать минимум 5 символов'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setAuthError('');
      const response = await axios.post('/api/v1/login', values);

      const { username, token } = response.data;
      localStorage.setItem('chatApp_jwtToken', token);
      localStorage.setItem('chatApp_username', username);
      // dispatch(setCredentials({ username, token }));

      navigate('/');

    } catch (error) {
      setAuthError('Неверное имя пользователя или пароль');
      console.error('Ошибка авторизации:', error);
    } finally {
      console.log('Отправленные данные:', values);
      setSubmitting(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Авторизация</h2>
      {authError && <Alert variant="danger">{authError}</Alert>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Имя пользователя</label>
              <Field
                type="text"
                name="username"
                id="username"
                placeholder="Введите имя пользователя"
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Введите пароль"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Вход...' : 'Войти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;