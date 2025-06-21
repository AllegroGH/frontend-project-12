import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Alert, Container, Row, Col, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import axios from 'axios'
import * as Yup from 'yup'

import { setCredentials } from '../slices/authSlice'
import loginImg from '../assets/login_img.jpg'

const LoginPage = () => {
  const [authError, setAuthError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const usernameRef = useRef(null)
  const { t } = useTranslation()

  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().required(t('validation.requiredField')),
    password: Yup.string().trim().required(t('validation.requiredField')),
  })

  const initialValues = {
    username: '',
    password: '',
  }

  const handleSubmit = async (values) => {
    try {
      setAuthError('')
      setIsSubmitting(true)
      const response = await axios.post('/api/v1/login', {
        username: values.username.trim(),
        password: values.password.trim(),
      })

      const { username, token } = response.data
      dispatch(setCredentials({ username, token }))

      navigate('/')
    }
    catch (error) {
      if (error.response?.status === 500) {
        toast.error(t('chatServer.serverUnavailable'))
      }
      else {
        setAuthError(t('chatServer.incorrectUserOrPass'))
        usernameRef.current?.focus()
        usernameRef.current?.select()
      }
      console.error(t('chatServer.authError'), error)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  const resetAuthError = () => {
    if (authError) setAuthError(null)
  }

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img
                  src={loginImg}
                  className="rounded-circle"
                  alt={t('login.title')}
                />
              </Col>
              <Col xs={12} md={6} className="mt-3 mt-md-0">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleChange }) => (
                    <Form>
                      <h1 className="text-center mb-4">{t('login.title')}</h1>
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="username"
                          className={`form-control ${authError ? 'is-invalid' : ''}`}
                          placeholder={t('login.usernamePlaceholder')}
                          as="input"
                          required={true}
                          innerRef={usernameRef}
                          onChange={(e) => {
                            resetAuthError()
                            handleChange(e) // продолжаем выполнение родного обработчика Formik
                          }}
                        />
                        <label htmlFor="username">{t('login.usernameLabel')}</label>
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="invalid-tooltip"
                        />
                      </div>

                      <div className="form-floating mb-4">
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="current-password"
                          className={`form-control ${authError ? 'is-invalid' : ''}`}
                          placeholder={t('login.passwordPlaceholder')}
                          as="input"
                          required={true}
                        />
                        <label htmlFor="password">{t('login.passwordLabel')}</label>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-tooltip"
                        />
                      </div>
                      {authError && <Alert variant="danger" className="p-1">{authError}</Alert>}
                      <button
                        type="submit"
                        className="w-100 mb-3 btn btn-outline-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t('login.enterButtonInProgress') : t('login.enterButton')}
                      </button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.signPageLinkPrefix')}</span>
                {' '}
                <Link to="/signup">{t('login.signPageLinkText')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
