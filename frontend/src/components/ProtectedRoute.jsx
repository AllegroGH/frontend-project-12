import { Navigate, Outlet } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setCredentials } from '../slices/authSlice';

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('chatApp_jwtToken');
  // const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // const username = localStorage.getItem('chatApp_username');
  // const token = localStorage.getItem('chatApp_jwtToken');
  // dispatch(setCredentials({ username, token }));

  return <Outlet />;
};

export default ProtectedRoute;