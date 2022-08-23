import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { validateEmailOnServer } from '../utils/api';

export const ResetPasswordWrapper = styled.main`
  height: 92vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 55%;
    height: 35px;
    font-size: 1.2rem;
    background: #444444;
    color: #ededed;
    border: none;
    border-radius: 5px;
    transition: all 0.35s ease;
    cursor: pointer;
    &:hover {
      background: #da0037;
      transition: all 0.35s ease;
    }
    &:disabled {
      background: gray;
      cursor: default;
    }
  }
  h1 {
    text-align: center;
  }
  form {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
      align-self: flex-start;
      margin-bottom: 5px;
    }
    input {
      width: 60%;
      height: 35px;
      text-align: center;
      font-size: 1.2rem;
      margin: 0.5rem;
      border-radius: 5px;
      border: 1px solid #000;
      margin-bottom: 5px;
    }
  }
  a {
    color: white;
  }
  @media (max-width: 700px) {
    h1 {
      font-size: 1rem;
    }
  }
`;

function EmailPassword() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await validateEmailOnServer({ email });
      setEmail('');
      setEmailSent(true);
    } catch (err) {
      setError(true);
    }
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
          {error && <h1>Email not in database</h1>}
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
        </section>
      )}
    </ResetPasswordWrapper>
  );
}

export default EmailPassword;
