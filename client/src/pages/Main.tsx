import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/components/Navbar';
import GlobalStyles from '../styles/GlobalStyles';

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
