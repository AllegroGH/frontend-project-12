import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppHeader from './AppHeader'

const Layout = ({ children }) => (
  <div className="h-100" id="chat">
    <div className="d-flex flex-column h-100">
      <AppHeader />
      {children}
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
  </div>
)

export default Layout
