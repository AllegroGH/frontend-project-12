import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useTranslation } from 'react-i18next';


const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="shadow-sm navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {token && (
          <Button variant="primary" onClick={handleLogout}>
            {t('appHeader.logoutButton')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default AppHeader;
