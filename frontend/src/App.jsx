import { Routes, Route, Navigate } from 'react-router-dom';
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Login from './components/Login';
import NotFound from './components/NotFound';

// function App() {
//   const [count, setCount] = useState(0)

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

function App() {
  //  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="login" />} />
        <Route path='login' element={<Login />} />        Add commentMore actions
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
