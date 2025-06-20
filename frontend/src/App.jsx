import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { initSocket, disconnectSocket } from './socket';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ChatPage from './components/ChatPage';
import NotFoundPage from './components/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import AppHeader from './components/AppHeader';

function App() {
  const { token, username } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  useEffect(() => {
    const handleOffline = () => toast.error(t('chatServer.netIsDown'));
    const handleOnline = () => toast.success(t('chatServer.netIsUp'));

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [t]);

  useEffect(() => {
    if (token) {
      initSocket(token);
      // console.log('App:token:: ', token);
      // console.log('App:username:: ', username);

      return () => {
        disconnectSocket();
      };
    }
  }, [token, username]);

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <AppHeader />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ChatPage />} />
          </Route>
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
