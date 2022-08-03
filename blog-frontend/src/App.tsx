import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
