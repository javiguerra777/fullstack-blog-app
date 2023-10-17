/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../../hook';
import { loginUser, clearError } from '../../../store/UserSlice';
import { RegistrationForm } from '../styles/RegistrationForm';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';
import UseIsLoggedIn from '../hooks/UseIsLoggedIn';

type SignInInput = {
  email: string;
  password: string;
};
function Signin() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<SignInInput>();
  const { loginLoading } = UseGetStoreUser();
  const [formValidation] = useState(true);
  const onSubmit: SubmitHandler<SignInInput> = (data) => {
    dispatch(
      loginUser({
        email: data.email.toLowerCase(),
        password: data.password,
      }),
    );
  };
  UseIsLoggedIn();
  // to clear error message if user returns to sign in page later in app
  useEffect(() => {
    dispatch(clearError());
    // to clear error message if user leaves the page and error is still true
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
  return (
    <RegistrationForm>
      <p>Sign In</p>
      <i className="fa-solid fa-user-astronaut" />
      <form onSubmit={handleSubmit(onSubmit)}>
        {false && (
          <p className="errorMessage">
            *username or password is invalid
          </p>
        )}
        <label htmlFor="email" id="email">
          {' '}
          Enter Email:
        </label>
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="YourEmail@gmail.com"
          className={!formValidation ? 'invalid' : ''}
        />
        <label htmlFor="password" id="password">
          {' '}
          Enter Password:
        </label>
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Your Password"
          className={!formValidation ? 'invalid' : ''}
        />
        <button type="submit" disabled={loginLoading}>
          Login
        </button>
      </form>
      <small>
        If you do not have an account, sign up{' '}
        <Link to="/register/signup">here</Link>
      </small>
      <small className="small">
        Forgot your password?{' '}
        <Link to="/validateEmail">Click Here</Link>
      </small>
    </RegistrationForm>
  );
}

export default Signin;
