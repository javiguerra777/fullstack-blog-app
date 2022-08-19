import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUserOnServer, resetPassword } from '../utils/api';

function ResetPassword() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [pwdForm, setPwdForm] = useState(false);
  const [password, setPassword] = useState('');
  const confirmId = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await validateUserOnServer(token);
    setPwdForm(true);
  };
  const submitNewPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPasswordParams = {
      token,
      body: {
        password,
      },
    };
    await resetPassword(newPasswordParams);
    navigate('/signin');
  };
  return (
    <div>
      {pwdForm ? (
        <div>
          <h1>Reset Password</h1>
          <form onSubmit={submitNewPassword}>
            <input
              type="text"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={password === ''}>
              Submit New Password
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Enter your token to reset your password</h1>
          <form onSubmit={confirmId}>
            <input
              type="text"
              name="token"
              id="token"
              placeholder="secret token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <button type="submit" disabled={token === ''}>
              Submit Token
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
