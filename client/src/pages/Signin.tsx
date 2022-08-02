import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, changeUsername } from '../store/UserSlice';

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const logginAttempt = await dispatch<any>(
      loginUser({ username: username.toLowerCase(), password }),
    );
    if (logginAttempt.error) {
      setPassword('');
    } else {
      dispatch(changeUsername(username));
      navigate('/');
    }
  };

  return (
    <div>
      <h1>login</h1>
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
    </div>
  );
}

export default Signin;
