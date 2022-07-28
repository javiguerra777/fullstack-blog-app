import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledForm = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    height: 400px;
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 2.5rem;
    }
    & input {
      width: 100%;
      height: 35px;
      text-align: center;
      font-size: 1.2rem;
      margin: 1rem;
      border-radius: 5px;
      border: 1px solid #000;
    }
    button {
      width: 100%;
      height: 35px;
      font-size: 1.2rem;
      background: #e2dcc8;
      border: 1px solid #000;
      transition: all 0.35s ease;
      cursor: pointer;
      &:hover {
        background: #0f3d3e;
        color: #e2dcc8;
        transition: all 0.35s ease;
      }
    }
  }
  p {
    font-size: 1.2rem;
    margin: 0;
  }
`;
function SignUp() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <StyledForm>
      <form className="Sign-In">
        <p>Sign In</p>
        <input
          type="text"
          id="username"
          placeholder="@usernmae"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        If you dont have an account, sign up{' '}
        <Link to="/signUp">here</Link>
      </p>
    </StyledForm>
  );
}

export default SignUp;
