import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { validateEmailOnServer } from '../utils/api';

export const ResetPasswordWrapper = styled.main`
  height: 92vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 5px;
    }
    input {
      margin-bottom: 5px;
    }
  }
`;

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
    <ResetPasswordWrapper>
      {emailSent ? (
        <section className="email-sent">
          <h1>Check your Email for instructions to reset password</h1>
        </section>
      ) : (
        <section className="validate-email">
          <h1>
            A link to reset your password will be sent to your email
          </h1>
          <form onSubmit={sendEmail}>
            <label htmlFor="email" id="email">
              {' '}
              Email:
            </label>
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
        </section>
      )}
    </ResetPasswordWrapper>
  );
}

export default EmailPassword;
