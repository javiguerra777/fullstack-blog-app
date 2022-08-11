/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { AppDispatch } from '../store';
import { loginUser } from '../store/UserSlice';

export const StyledForm = styled.section`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & i {
    font-size: 5rem;
  }
  form {
    height: 300px;
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
    font-size: 3rem;
    margin: 2rem auto;
    font-weight: 300;
  }
  & small {
    font-size: 1.25rem;
  }
`;

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginAttempt = await dispatch<any>(
      loginUser({ username: username.toLowerCase(), password }),
    );

    if (loginAttempt.error) {
      setPassword('');
    } else {
      navigate('/');
    }
  };

  return (
    <StyledForm>
      <p>Sign In</p>
      <i className="fa-solid fa-user-astronaut" />
      <form onSubmit={submitLoginForm}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <small>
        If you do not have an account, sign up{' '}
        <Link to="/signup">here</Link>
      </small>
    </StyledForm>
  );
}

export default Signin;
