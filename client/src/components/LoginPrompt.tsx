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
    background: #171717;
    color: #ededed;
    width: 75vw;
    align-self: center;
    padding: 0em 1em 1.5em 1em;
    .main-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .btn-container {
        .btn-exit {
          background: #171717;
          color: #ededed;
          border: none;
        }
      }
    }
    .section-container {
      align-items: center;
      display: flex;
      flex-direction: column;
      .btn-link {
        color: #ededed;
        background: none;
        border: none;
      }
      .btn-link:hover {
        text-decoration: underline;
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
        <header className="main-header">
          <p />
          <section className="h1-container">
            <h1>You must be logged in to like posts</h1>
          </section>
          <section className="btn-container">
            <button
              className="btn-exit"
              type="button"
              onClick={hidePrompt}
            >
              x
            </button>
          </section>
        </header>
        <section className="section-container">
          <p>Click here to log in to your account</p>
          <button
            type="button"
            className="btn-link"
            onClick={() => changePage('signin')}
          >
            Click here to sign in
          </button>
        </section>
        <section className="section-container">
          <p>
            If you do not have an account you can sign up for one here
          </p>
          <button
            className="btn-link"
            type="button"
            onClick={() => changePage('signup')}
          >
            Click here to sign up for account
          </button>
        </section>
      </section>
    </LoginPromptWrapper>
  );
}

export default LoginPrompt;
