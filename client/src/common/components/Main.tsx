import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import GlobalStyles from './GlobalStyles';

function Main() {
  return (
    <div>
      <GlobalStyles />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Main;
