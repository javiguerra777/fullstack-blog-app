import React, { useState } from 'react';
import { StyledForm } from './Signin';

function SignUp() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <StyledForm>
      <h1>Sign Up</h1>
      <i className="fa-solid fa-user-plus" />
      <form>
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
        <button type="submit">Submit</button>
      </form>
    </StyledForm>
  );
}

export default SignUp;
