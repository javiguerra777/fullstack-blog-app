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
  const { register, handleSubmit } = useForm<SignUpInput>();
  const onSubmit: SubmitHandler<SignUpInput> = (data) => {
    dispatch(
      signUpUser({
        email: data.email.toLowerCase().trim(),
        username: data.username.toLowerCase().trim(),
        password: data.password,
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
        <label
          htmlFor="email"
          id="email"
          style={{ marginTop: '1em' }}
        >
          {' '}
          Enter Email:
        </label>
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="example@gmail.com"
          className=""
          id="email"
        />
        <label htmlFor="username" id="username">
          {' '}
          Enter Username:
        </label>
        <input
          {...register('username', { required: true })}
          type="text"
          placeholder="@username"
          className=""
        />
        <label htmlFor="password" id="password">
          {' '}
          Enter Password:
        </label>
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Your Password"
        />
        <button type="submit" disabled={signInLoading}>
          Sign Up
        </button>
      </form>
    </RegistrationForm>
  );
}

export default SignUp;
