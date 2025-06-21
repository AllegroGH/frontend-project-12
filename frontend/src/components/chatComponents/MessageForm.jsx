import React from 'react'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'

import { useAddMessageMutation } from '../../slices/apiSlice'
import SendMessageIcon from '../../icons/SendMessageIcon'

const MessageForm = React.forwardRef(function MessageForm({ channelId }, ref) {
  const { username } = useSelector(state => state.auth)
  const inputRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [addMessage] = useAddMessageMutation()
  const { t } = useTranslation()

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
  }))

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true)
        await addMessage({ username, channelId, body: leoProfanity.clean(values.body) })
        resetForm()
        inputRef.current?.focus()
      }
      catch (err) {
        console.error('Failed to send message:', err)
      }
      finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input
          ref={inputRef}
          name="body"
          aria-label={t('chat.messageForm.ariaLabel')}
          placeholder={t('chat.messageForm.placeholder')}
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
        <SendMessageIcon />
          <span className="visually-hidden">{t('chat.messageForm.sendSpan')}</span>
        </button>
      </div>
    </form>
  )
})

export default MessageForm
