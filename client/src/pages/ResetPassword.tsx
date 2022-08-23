/* eslint-disable prettier/prettier */
import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateUserOnServer, resetPassword } from '../utils/api';
import { ResetPasswordWrapper } from './EmailPassword';

function ResetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [token, setToken] = useState('');
  const [pwdForm, setPwdForm] = useState(false);
  const [password, setPassword] = useState('');
  const confirmId = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await validateUserOnServer(token);
      setPwdForm(true);
    } catch (err) {
      setError(true);
    }
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
    <ResetPasswordWrapper>
      {pwdForm ? (
        <section>
          <h1>Enter New Password to Reset Password</h1>
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
        </section>
      ) : (
        <section>
          <h1>Enter your token to reset your password</h1>
          {error && (
            <section>
              <h1>
                Invalid Token or Token expired, please submit email
                again
                {' '}
                <Link to="validateEmail">Click Here</Link>
              </h1>
            </section>
          )}
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
        </section>
      )}
    </ResetPasswordWrapper>
  );
}

export default ResetPassword;
