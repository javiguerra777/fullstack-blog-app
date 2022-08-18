import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const [pwdForm, setPwdForm] = useState(false);
  const confirmId = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPwdForm(true);
  };
  const submitNewPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/signin');
  };
  return (
    <div>
      {pwdForm ? (
        <div>
          <h1>Reset Password</h1>
          <form onSubmit={submitNewPassword}>
            <input type="text" placeholder="New Password" />
            <button type="submit">Submit New Password</button>
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
            />
            <button type="submit">Submit Token</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
