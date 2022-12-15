import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dog from '../resources/images/404-dog.jpg';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    console.log('Go Home button clicked');
    navigate('/');
  };

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Uh oh, the page you were looking for was not found.</p>
      <img src={dog}></img>
      <button onClick={goHome}>Go Home</button>
    </div>
  );
};

export default NotFound;
