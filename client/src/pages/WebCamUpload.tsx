/* eslint-disable prettier/prettier */
import React, {
  FormEvent, useEffect, useState, ChangeEvent,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  setCurrentContent,
  setCurrentTitle,
  addWebCamImage,
} from '../store/PostSlice';
import { RootState } from '../store';
import { Category } from '../types/types';

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
        height: 30px;
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

function WebCamUpload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, content, image } = useSelector(
    (state: RootState) => state.post,
    shallowEqual,
  );
  const { categories } = useSelector((state: RootState) => state.category, shallowEqual);
  const {
    userId,
    username,
    image: profilepicture,
  } = useSelector((state: RootState) => state.user, shallowEqual);
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    dispatch(setCurrentContent(''));
    dispatch(setCurrentTitle(''));
    return () => {
      dispatch(setCurrentContent(''));
      dispatch(setCurrentTitle(''));
    };
  }, [dispatch]);

  // handle category change
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }
  function invalidateInputs() {
    if (!title || !content || !image) {
      return true;
    }
    return false;
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const uploadImage = {
      userId,
      post: {
        title,
        username,
        body: content,
        date: Date.now(),
        category,
        image,
        profilepicture,
        // ensures that file has different name on upload
        imageKey: uuidv4() + username + Date.now(),
      },
    };
    const uploadPostAttempt = await dispatch<any>(addWebCamImage(uploadImage));
    if (!uploadPostAttempt.error) {
      navigate('/');
    }
  }
  return (
    <StyledNewPost>
      <p data-testid="image-post-description">Upload Image</p>
      <select
        value={category}
        id="category"
        onChange={handleChange}
        data-testid="select-image-category"
      >
        <option value="">none</option>
        {/* eslint-disable-next-line max-len */}
        {categories.map(({ category: theCategory } : Category) => <option key={uuidv4()} value={theCategory}>{theCategory}</option>)}
      </select>
      <form onSubmit={handleSubmit} data-testid="image-form">
        <div>
          <label htmlFor="title">
            <input
              id="title"
              type="text"
              placeholder="Title of post"
              value={title}
              onChange={(e) => dispatch(setCurrentTitle(e.target.value))}
              data-testid="image-title"
            />
          </label>

          <textarea
            placeholder="Content...."
            id="content"
            value={content}
            onChange={(e) => dispatch(setCurrentContent(e.target.value))}
            data-testid="image-content"
          />
        </div>
        <button type="submit" disabled={invalidateInputs()}>Post</button>
      </form>
    </StyledNewPost>
  );
}

export default WebCamUpload;
