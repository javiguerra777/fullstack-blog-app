/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../store';
import { useNavigate, Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
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
      &.errorMessage {
        font-size: 1.15rem;
        margin: 0;
        color: red;
      }
    }
    & input {
      width: 100%;
      height: 35px;
      text-align: center;
      font-size: 1.2rem;
      margin: 1rem;
      border-radius: 5px;
      border: 1px solid #000;
      &.invalid {
        border: 2px solid red;
      }
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
  // eslint-disable-next-line prettier/prettier
  const [formValidation, setFormaValidation] = useState<boolean>(true);

  const submitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginAttempt = await dispatch<any>(
      loginUser({ username: username.toLowerCase(), password }),
    );

    if (loginAttempt.error) {
      setPassword('');
      setFormaValidation(false);
    } else {
      navigate('/');
      setFormaValidation(true);
    }
  };

  return (
    <StyledForm>
      <p>Sign In</p>
      <i className="fa-solid fa-user-astronaut" />
      <form onSubmit={submitLoginForm}>
        {!formValidation && (
          <p className="errorMessage">
            *username or password is invalid
          </p>
        )}
        <input
          type="text"
          placeholder="@username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={!formValidation ? 'invalid' : ''}
        />

        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={!formValidation ? 'invalid' : ''}
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
