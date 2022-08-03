import React, { useState } from 'react';
import styled from 'styled-components';

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
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <StyledForm>
      <h1>Sign Up</h1>
      <i className="fa-solid fa-user-plus" />
      <form>
        <input
          type="text"
          placeholder="@username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </StyledForm>
  );
}

export default SignUp;
