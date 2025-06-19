import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { initSocket, disconnectSocket } from './socket';
import { Routes, Route } from 'react-router-dom';
import './App.css'

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ChatPage from './components/ChatPage';
import NotFoundPage from './components/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import AppHeader from './components/AppHeader';

function App() {
  const { token, username } = useSelector((state) => state.auth);

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
    <>
      <AppHeader />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignupPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App

// function App() {

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more1111111111111111
//       </p>
//     </>
//   )
// }
