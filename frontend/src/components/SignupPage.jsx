import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import axios from 'axios'
import * as Yup from 'yup'

import { setCredentials } from '../slices/authSlice'
import signupImg from '../assets/signup_img.jpg'

const SignupPage = () => {
  const [signupError, setSignupError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const usernameRef = useRef(null)
  const { t } = useTranslation()

  const validationSchema = Yup.object().shape({
    username: Yup.string().trim()
      .required(t('validation.requiredField'))
      .min(3, t('validation.min3max20'))
      .max(20, t('validation.min3max20')),
    password: Yup.string().trim()
      .required(t('validation.requiredField'))
      .min(6, t('validation.min6')),
    confirmPassword: Yup.string().trim()
      .required(t('validation.confirmPassword'))
      .oneOf([Yup.ref('password'), null], t('validation.passwordsMustMatch')),
  })

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  }

  const handleSubmit = async (values) => {
    try {
      setSignupError('')
      setIsSubmitting(true)
      const response = await axios.post('/api/v1/signup', {
        username: values.username.trim(),
        password: values.password.trim(),
      })

      const { username, token } = response.data
      dispatch(setCredentials({ username, token }))

      navigate('/')
    }
    catch (error) {
      if (error.response?.status === 409) {
        setSignupError(t('chatServer.userExists'))
      }
      else if (error.response?.status === 500) {
        toast.error(t('chatServer.serverUnavailable'))
      }
      else {
        setSignupError(t('chatServer.signupError'))
      }
      usernameRef.current?.focus()
      usernameRef.current?.select()
      console.error(t('chatServer.signupError'), error)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  const resetSignupError = () => {
    if (signupError) setSignupError(null)
  }

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
                  alt={t('signup.title')}
                />
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, handleChange }) => (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">{t('signup.title')}</h1>

                    <div className="form-floating mb-3">
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className={`form-control ${(errors.username && touched.username) || signupError ? 'is-invalid' : ''}`}
                        placeholder={t('signup.usernamePlaceholder')}
                        required={true}
                        innerRef={usernameRef}
                        onChange={(e) => {
                          resetSignupError()
                          handleChange(e) // продолжаем выполнение родного обработчика Formik
                        }}
                      />
                      <label htmlFor="username">{t('signup.usernameLabel')}</label>
                      {signupError
                        ? (
                            <div className="invalid-tooltip"></div>
                          )
                        : (
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
                        className={`form-control ${(errors.password && touched.password) || signupError ? 'is-invalid' : ''}`}
                        placeholder={t('signup.passwordPlaceholder')}
                        required={true}
                      />
                      <label htmlFor="password">{t('signup.passwordLabel')}</label>
                      {signupError
                        ? (
                            <div className="invalid-tooltip"></div>
                          )
                        : (
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
                        className={`form-control ${(errors.confirmPassword && touched.confirmPassword) || signupError ? 'is-invalid' : ''}`}
                        placeholder={t('signup.confirmPasswordPlaceholder')}
                        required={true}
                      />
                      <label htmlFor="confirmPassword">{t('signup.confirmPasswordLabel')}</label>
                      {signupError
                        ? (
                            <div className="invalid-tooltip">{signupError}</div>
                          )
                        : (
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
                      {isSubmitting ? t('signup.signupButtonInProgress') : t('signup.signupButton')}
                    </button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupPage
