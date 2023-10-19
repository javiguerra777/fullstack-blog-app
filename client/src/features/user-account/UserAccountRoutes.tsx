import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../../common/components/NotFound';
import ChangePassword from './pages/ChangePassword';
import UpdateInformation from './pages/UpdateInformation';
import UserInfo from './pages/UserInfo';

export default function UserAccountRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserInfo />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route
        path="/update-information"
        element={<UpdateInformation />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
