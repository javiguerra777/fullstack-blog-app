import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleDisplayPrompt } from '../store/UserSlice';

const LoginPromptWrapper = styled.main`
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  button {
    cursor: pointer;
  }
  .main-content {
    display: flex;
    flex-direction: column;
    position: relative;
    top: 10vh;
    background-color: white;
    width: 75vw;
    align-self: center;
    padding-bottom: 3vh;
    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      button {
        background: none;
        border: none;
        height: auto;
      }
    }
    section {
      align-items: center;
      display: flex;
      flex-direction: column;
      button {
        background: none;
        border: none;
      }
    }
  }
`;

function LoginPrompt() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hidePrompt = () => {
    dispatch(toggleDisplayPrompt());
  };
  const changePage = (params: string) => {
    hidePrompt();
    navigate(params);
  };
  return (
    <LoginPromptWrapper>
      <section className="main-content">
        <header>
          <h1>You must be logged in to like posts</h1>
          <button type="button" onClick={hidePrompt}>
            x
          </button>
        </header>
        <section>
          <p>Click here to log in to your account</p>
          <button type="button" onClick={() => changePage('signin')}>
            Click here to sign in
          </button>
        </section>
        <section>
          <p>
            If you do not have an account you can sign up for one here
          </p>
          <button type="button" onClick={() => changePage('signup')}>
            Click here to sign up for account
          </button>
        </section>
      </section>
    </LoginPromptWrapper>
  );
}

export default LoginPrompt;
