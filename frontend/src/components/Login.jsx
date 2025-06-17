import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('это обязательное поле'),
    password: Yup.string()
      .required('это обязательное поле')
      .min(6, 'Пароль должен содержать минимум 6 символов'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Отправленные данные:', values);
    setSubmitting(false);
  };

  return (
    <div className="login-form">
      <h2>Авторизация</h2>
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