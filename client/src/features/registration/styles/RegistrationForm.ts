import styled from 'styled-components';

export const RegistrationForm = styled.section`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  & i {
    font-size: 5rem;
  }
  form {
    height: 300px;
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 2.5rem;
      &.errorMessage {
        font-size: 1.15rem;
        margin: 0;
        color: red;
      }
    }
    & input {
      width: 100%;
      height: 35px;
      text-align: center;
      font-size: 1.2rem;
      margin: 0.5rem;
      border-radius: 5px;
      border: 1px solid #000;
      &.invalid {
        border: 2px solid red;
      }
    }
    button {
      width: 100%;
      height: 35px;
      font-size: 1.2rem;
      background: #444444;
      color: #ededed;
      border: none;
      border-radius: 5px;
      transition: all 0.35s ease;
      cursor: pointer;
      &:hover {
        background: #da0037;
        transition: all 0.35s ease;
      }
      &:disabled {
        background: gray;
        cursor: default;
      }
    }
  }
  p {
    font-size: 3rem;
    margin: 2rem auto;
    font-weight: 300;
  }
  & small {
    font-size: 1.25rem;
    & a {
      color: #ededed;
    }
  }
  label {
    align-self: flex-start;
  }
  .small {
    margin-top: 1em;
    font-size: 1rem;
    align-self: center;
  }
  .forgot-pwd {
    a {
      color: white;
    }
  }
  h1 {
    word-wrap: break-word;
  }

  @media (max-width: 576px) {
    & form {
      & input {
        width: 300px;
        height: 30px;
      }
      & button {
        width: 300px;
      }
      & label {
        align-self: center;
      }
    }
    & small {
      font-size: 1rem;
    }
  }
  @media (max-width: 500px) {
    h1 {
      font-size: 1rem;
    }
  }
`;
export default {};
