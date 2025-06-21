import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { initSocket, disconnectSocket } from './socket'

import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import ChatPage from './components/ChatPage'
import NotFoundPage from './components/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { token, username } = useSelector(state => state.auth)
  const { t } = useTranslation()

  useEffect(() => {
    const handleOffline = () => toast.error(t('chatServer.netIsDown'))
    const handleOnline = () => toast.success(t('chatServer.netIsUp'))

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [t])

  useEffect(() => {
    if (token) {
      initSocket(token)
      return () => {
        disconnectSocket()
      }
    }
  }, [token, username])

  return (
    <Layout>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
