import React from 'react';
import { StyledForm } from './SignIn';

function SignUp() {
  return (
    <StyledForm>
      <form className="Sign-Up">
        <p>Sign Up</p>
        <input type="text" id="username" placeholder="@username" />
        <input type="password" id="password" placeholder="********" />
        <button type="submit">Sign Up</button>
      </form>
    </StyledForm>
  );
}

export default SignUp;
