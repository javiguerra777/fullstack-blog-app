import React, { useState, FormEvent } from 'react';

function EmailPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
    setEmailSent(true);
  };
  return (
    <div>
      {emailSent ? (
        <div>
          <h1>
            If your email is valid, you will receive an email to reset
            your password. Check your email.
          </h1>
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
