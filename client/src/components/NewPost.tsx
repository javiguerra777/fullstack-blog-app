/* eslint-disable prettier/prettier */
import React, { FormEvent, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentContent,
  setCurrentTitle,
  addNewPost,
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
        width: 30em;
        height: 2em;
        margin: 1rem;
        border-radius: 5px;
        border: 1px solid #000;
        text-align: center;
        font-size: 1.3rem;
      }
      & textarea {
        height: 10em;
        width: 30em;
        border: 1px solid #000;
        border-radius: 5px;
        font-family: 'Quicksand', sans-serif;
        font-size: 1.25rem;
        resize: none;
      }
    }
    & button {
      width: 30em;
      height: 2em;
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
  const navigate = useNavigate();

  // redux useSelectors
  const { title, content } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  const { username, userId } = useSelector(
    (state: any) => state.user,
    shallowEqual,
  );

  // states used in component
  const [image, setImage] = useState({});

  // function to handle image change
  const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target!.files![0]);
  };

  // submit function to upload new post
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newPost = {
      post: {
        title,
        body: content,
        date: Date.now(),
        username,
        image,
      },
      userId,
    };
    const createPost = await dispatch<any>(addNewPost(newPost));
    if (!createPost.error) {
      navigate('/');
    }
  }
  console.log(image);
  return (
    <StyledNewPost>
      <p>New Post</p>
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
          <input
            type="file"
            onChange={changeImage}
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </StyledNewPost>
  );
}

export default NewPost;
