import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('chatApp_jwtToken')

  if (!isAuthenticated) {
    // console.log('protRoute: is NOT Authenticated');
    return <Navigate to="/login" replace />
  }

  // console.log('protRoute: route to /');
  return <Outlet />
}

export default ProtectedRoute