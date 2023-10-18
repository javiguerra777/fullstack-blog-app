/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, {
  // useEffect,
  ChangeEvent,
} from 'react';
// import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegistrationForm } from '../styles/RegistrationForm';
import { useAppDispatch } from '../../../hook';
import UseIsLoggedIn from '../hooks/UseIsLoggedIn';
import { signUpUser } from '../../../store/UserSlice';
import UseClearSignUpErrors from '../hooks/UseClearSignUpErrors';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';
import SignUpErrorNotification from '../components/SignUpErrorNotification';

type SignUpInput = {
  email: string;
  username: string;
  password: string;
};
function SignUp() {
  const dispatch = useAppDispatch();
  const { signInError, signInLoading } = UseGetStoreUser();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isDirty },
  } = useForm<SignUpInput>({ mode: 'all' });
  const onSubmit: SubmitHandler<SignUpInput> = (data) => {
    dispatch(
      signUpUser({
        email: data.email.toLowerCase().trim(),
        username: data.username.toLowerCase().trim(),
        password: data.password,
        profile_picture: 'default',
      }),
    );
  };
  // change event for selecting files
  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files || e.target.files.length === 0) {
  //     setPreviewPicture('');
  //     setImgBtnDisabled(true);
  //     return;
  //   }
  //   setPicture(e.target.files[0]);
  //   setPreviewPicture(URL.createObjectURL(e.target.files[0]));
  //   setImgBtnDisabled(false);
  // };
  UseIsLoggedIn();
  UseClearSignUpErrors();
  return (
    <RegistrationForm>
      {signInError && <SignUpErrorNotification />}
      <p>Sign Up</p>
      <i className="fa-solid fa-user-plus" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" id="email" className="mt-1">
          {' '}
          Enter Email:
        </label>
        {errors.email && touchedFields.email && (
          <div className="w-full text-start text-red-600">
            Invalid Email
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
          placeholder="example@gmail.com"
          className="text-black"
        />
        <label htmlFor="username" id="username">
          {' '}
          Enter Username:
        </label>
        {errors.username && touchedFields.username && (
          <div className="w-full text-start text-red-600">
            Invalid Username
          </div>
        )}
        <input
          {...register('username', { required: true })}
          type="text"
          placeholder="@username"
          className="text-black"
        />
        <label htmlFor="password" id="password">
          {' '}
          Enter Password:
        </label>
        {errors.password && touchedFields.password && (
          <div className="w-full text-start text-red-600">
            Invalid Password
          </div>
        )}
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Your Password"
          className="text-black"
        />
        <button
          type="submit"
          disabled={signInLoading || !isValid || !isDirty}
        >
          Sign Up
        </button>
      </form>
    </RegistrationForm>
  );
}

export default SignUp;
