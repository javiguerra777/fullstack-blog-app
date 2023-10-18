/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../../hook';
import { loginUser, clearError } from '../../../store/UserSlice';
import { RegistrationForm } from '../styles/RegistrationForm';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';
import UseIsLoggedIn from '../hooks/UseIsLoggedIn';
import LoginErrorNotification from '../components/LoginErrorNotification';

type SignInInput = {
  email: string;
  password: string;
};
function Signin() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isDirty, isValid },
  } = useForm<SignInInput>({ mode: 'all' });
  const { loginLoading, loginError } = UseGetStoreUser();
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
      {loginError && <LoginErrorNotification />}
      <p>Sign In</p>
      <i className="fa-solid fa-user-astronaut" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" id="email">
          {' '}
          Enter Email:
        </label>
        {errors.email && touchedFields.email && (
          <div className="text-start w-full text-red-600">
            Enter valid email address
          </div>
        )}
        <input
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Enter a valid email address',
            },
          })}
          type="email"
          placeholder="YourEmail@gmail.com"
          className={
            errors.email && touchedFields.email ? 'invalid' : ''
          }
        />
        <label htmlFor="password" id="password">
          {' '}
          Enter Password:
        </label>
        {errors.password && touchedFields.password && (
          <div className="w-full text-start text-red-600">
            Password is invalid
          </div>
        )}
        <input
          {...register('password', {
            required: true,
            minLength: 3,
          })}
          type="password"
          placeholder="Your Password"
          className={`text-black ${
            errors.password && touchedFields.password ? 'invalid' : ''
          }`}
        />
        <button
          type="submit"
          className="mt-2"
          disabled={loginLoading || !isValid || !isDirty}
        >
          Login
        </button>
      </form>
      <small>
        If you do not have an account,{' '}
        <Link
          to="/register/signup"
          className="underline hover:text-blue-600"
        >
          {' '}
          Sign Up Here
        </Link>
      </small>
      <div className="mt-2">
        Forgot your password?{' '}
        <Link
          to="/validateEmail"
          className="underline hover:text-blue-600"
        >
          Click Here
        </Link>
      </div>
    </RegistrationForm>
  );
}

export default Signin;
