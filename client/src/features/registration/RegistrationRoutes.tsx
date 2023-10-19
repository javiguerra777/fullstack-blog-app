import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import NotFound from '../../common/components/NotFound';
import EmailPassword from './pages/EmailPassword';
import ResetPassword from './pages/ResetPassword';

export default function RegistrationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/validate-email" element={<EmailPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
