import React, { useState } from 'react';
import dog from '../resources/images/404-dog.jpg';

const NotFound = () => {
  return (
    <div>
      <h1>404 Error: Not Found</h1>
      <img src={dog}></img>
    </div>
  );
};

export default NotFound;
