import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Button } from 'react-bootstrap';
// import { ToastContainer } from 'react-toastify';
import notFoundImg from '../assets/404-D_FLHmTM.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';


const NotFoundPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg" className="shadow-sm navbar-light bg-white">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            {token && (
              <Button variant="primary" onClick={handleLogout}>
                Выйти
              </Button>
            )}
          </Container>
        </Navbar>

        <div className="text-center my-auto">
          <img
            alt="Страница не найдена"
            className="img-fluid h-25"
            src={notFoundImg}
          />
          <h1 className="h4 text-muted mt-3">Страница не найдена</h1>
          <p className="text-muted">
            Но вы можете перейти <Link to="/">на главную страницу</Link>
          </p>
        </div>
      </div>
      <div className="Toastify"></div>
    </div>
  );
};

export default NotFoundPage;
