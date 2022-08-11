import React, { useState, useEffect, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StyledForm } from './Signin';
import { signUpUser } from '../store/UserSlice';
import { getUsers } from '../utils/api';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [users, setUsers] = useState([]);
  let disabled = false;
  let repeatUser = false;
  useEffect(() => {
    getUsers().then(({ data }) => setUsers(data));
  }, []);
  async function signup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const signUpInfo = {
      username,
      password,
      date: Date.now(),
    };
    const results = await dispatch<any>(signUpUser(signUpInfo));
    if (!results.error) {
      navigate('/signin');
    }
  }
  // checks if username or password is empty and disables button
  if (!username || !password) {
    disabled = true;
  }
  // if username is equal to an existing username in the database the button is also disabled
  users.forEach((user: any) => {
    if (username.toLowerCase() === user.username.toLowerCase()) {
      disabled = true;
      repeatUser = true;
    }
  });
  return (
    <StyledForm>
      {repeatUser && <h1>Username exists already</h1>}
      <h1>Sign Up</h1>
      <i className="fa-solid fa-user-plus" />
      <form onSubmit={signup}>
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
        <button type="submit" disabled={disabled}>
          Sign Up
        </button>
      </form>
    </StyledForm>
  );
}

export default SignUp;
