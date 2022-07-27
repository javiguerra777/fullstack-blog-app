import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  setCurrentContent,
  setCurrentTitle,
} from '../store/PostSlice';

const StyledNewPost = styled.section`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & p {
    font-size: 2.75rem;
  }
  & form {
    height: 70vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & input {
        width: 900px;
        height: 30px;
        margin: 1rem;
        border-radius: 5px;
        border: 1px solid #000;
        text-align: center;
        font-size: 1.3rem;
      }
      & textarea {
        height: 500px;
        width: 900px;
        border: 1px solid #000;
        border-radius: 5px;
        font-family: 'Quicksand', sans-serif;
        font-size: 1.25rem;
      }
    }
    & button {
      width: 900px;
      height: 45px;
      margin: 1rem;
      font-size: 1.25rem;
      background: #0f3d3e;
      color: #e2dcc8;
      border-radius: 5px;
      border: none;
      cursor: pointer;
    }
  }
`;

function NewPost() {
  const dispatch = useDispatch();
  const { title, content } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(title);
    console.log(content);
  }

  return (
    <StyledNewPost>
      <p>Edit Post</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            <input
              id="title"
              type="text"
              placeholder="Title of post"
              value={title}
              onChange={(e) => dispatch(setCurrentTitle(e.target.value))}
            />
          </label>

          <textarea
            placeholder="Content...."
            id="content"
            value={content}
            onChange={(e) => dispatch(setCurrentContent(e.target.value))}
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </StyledNewPost>
  );
}

export default NewPost;
