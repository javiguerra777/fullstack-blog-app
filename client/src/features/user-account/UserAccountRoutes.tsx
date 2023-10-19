import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../../common/components/NotFound';
import UserInfo from './pages/UserInfo';

export default function UserAccountRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserInfo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
