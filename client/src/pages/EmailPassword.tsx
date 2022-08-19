import React, { useState, FormEvent } from 'react';
import { validateEmailOnServer } from '../utils/api';

function EmailPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await validateEmailOnServer({ email });
    setEmail('');
    setEmailSent(true);
  };
  return (
    <div>
      {emailSent ? (
        <div>
          <h1>Check your Email on instructions to reset password</h1>
        </div>
      ) : (
        <div>
          <h1>
            Enter your email and a link will be sent to reset your
            password
          </h1>
          <form onSubmit={sendEmail}>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" disabled={email === ''}>
              Send Password Link
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EmailPassword;
