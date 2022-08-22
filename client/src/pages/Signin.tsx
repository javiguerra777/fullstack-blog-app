/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../store';
import { loginUser, clearError } from '../store/UserSlice';

export const StyledForm = styled.section`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
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
      margin: 0.5rem;
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
  }
  p {
    font-size: 3rem;
    margin: 2rem auto;
    font-weight: 300;
  }
  & small {
    font-size: 1.25rem;
    & a {
      color: #ededed;
    }
  }
  label {
    align-self: flex-start;
  }
  .small {
    margin-top: 1em;
    font-size: 1rem;
    align-self: center;
  }
  .forgot-pwd {
    a {
      color: white;
    }
  }

  @media (max-width: 576px) {
    & form {
      & input {
        width: 300px;
        height: 30px;
      }
      & button {
        width: 300px;
      }
      & label {
        align-self: center;
      }
    }
    & small {
      font-size: 1rem;
    }
  }
`;

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line prettier/prettier
  const [formValidation, setFormaValidation] = useState<boolean>(true);

  // to clear error message if user returns to sign in page later in app
  useEffect(() => {
    dispatch(clearError());
    // to clear error message if user leaves the page and error is still true
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

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

  const invalidLoginInfo = () => {
    if (!username || !password) {
      return true;
    }
    return false;
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
        {error && (
          <section className="forgot-pwd">
            If you forgot your password you can reset it using this
            link <Link to="/validateEmail">Click Here</Link>
          </section>
        )}
        <label htmlFor="username" id="username">
          {' '}
          Enter Username:
        </label>
        <input
          type="text"
          placeholder="@username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={!formValidation ? 'invalid' : ''}
        />
        <label htmlFor="password" id="password">
          {' '}
          Enter password:
        </label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={!formValidation ? 'invalid' : ''}
        />
        <button type="submit" disabled={invalidLoginInfo()}>
          Login
        </button>
      </form>
      <small>
        If you do not have an account, sign up{' '}
        <Link to="/signup">here</Link>
      </small>
      <small className="small">
        Forgot your password?{' '}
        <Link to="/validateEmail">Click Here</Link>
      </small>
    </StyledForm>
  );
}

export default Signin;
