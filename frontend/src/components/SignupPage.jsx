import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import signupImg from '../assets/signup_img.jpg'

const SignupPage = () => {
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef(null);

  const validationSchema = Yup.object().shape({
    username: Yup.string().trim()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: Yup.string().trim()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
    confirmPassword: Yup.string().trim()
      .required('Подтвердите пароль')
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
  });

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values) => {
    try {
      setAuthError('');
      setIsSubmitting(true);
      const response = await axios.post('/api/v1/signup', {
        username: values.username.trim(),
        password: values.password.trim(),
      });

      const { username, token } = response.data;
      localStorage.setItem('chatApp_username', username);
      localStorage.setItem('chatApp_jwtToken', token);
      dispatch(setCredentials({ username, token }));

      navigate('/');

    } catch (error) {
      if (error.response?.status === 409) {
        setAuthError('Такой пользователь уже существует');
      } else {
        setAuthError(error.response?.data?.message || 'Ошибка регистрации');
      }
      // setAuthError(error.response?.data?.message === "Conflict" ? 'Такой пользователь уже существует' : 'Ошибка регистрации');
      usernameRef.current?.focus();
      usernameRef.current?.select();
      console.error('Ошибка регистрации:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAuthError = () => {
    if (authError) setAuthError(null);
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={signupImg}
                  className="rounded-circle"
                  alt="Регистрация"
                />
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, handleChange }) => (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">Регистрация</h1>

                    <div className="form-floating mb-3">
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className={`form-control ${(errors.username && touched.username) || authError ? 'is-invalid' : ''}`}
                        placeholder="От 3 до 20 символов"
                        required={true}
                        innerRef={usernameRef}
                        onChange={(e) => {
                          resetAuthError();
                          handleChange(e);  // продолжаем выполнение родного обработчика Formik
                        }}
                      />
                      <label htmlFor="username">Имя пользователя</label>
                      {authError ? (
                        <div className="invalid-tooltip"></div>
                      ) : (
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="invalid-tooltip"
                        />
                      )}
                    </div>

                    <div className="form-floating mb-3">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="new-password"
                        className={`form-control ${(errors.password && touched.password) || authError ? 'is-invalid' : ''}`}
                        placeholder="Не менее 6 символов"
                        required={true}
                      />
                      <label htmlFor="password">Пароль</label>
                      {authError ? (
                        <div className="invalid-tooltip"></div>
                      ) : (
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-tooltip"
                        />
                      )}
                    </div>

                    <div className="form-floating mb-4">
                      <Field
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="new-password"
                        className={`form-control ${(errors.confirmPassword && touched.confirmPassword) || authError ? 'is-invalid' : ''}`}
                        placeholder="Пароли должны совпадать"
                        required={true}
                      />
                      <label htmlFor="confirmPassword">Подтвердите пароль</label>
                      {authError ? (
                        <div className="invalid-tooltip">{authError}</div>
                      ) : (
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="invalid-tooltip"
                        />
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-100 btn btn-outline-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;