import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/UserSlice';

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const { logginError } = useSelector((state: any) => state.user);
  const submitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const logginAttempt = await dispatch<any>(
      loginUser({ username, password }),
    );
    if (logginAttempt.error) {
      console.log('failed login');
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

export default Login;
