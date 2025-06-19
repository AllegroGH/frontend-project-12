import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImg from '../assets/404_notFound_img.svg';

const NotFoundPage = () => {
  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
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
