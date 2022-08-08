/* eslint-disable prettier/prettier */
import React, {
  FormEvent, useState, ChangeEvent, useEffect,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  setCurrentContent,
  setCurrentTitle,
  addNewPost,
} from '../store/PostSlice';
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
    & button:disabled {
      cursor: default;
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
  const { categories } = useSelector((state: any) => state.category, shallowEqual);

  // states used in component
  const [image, setImage] = useState({});
  const [category, setCategory] = useState<string>();

  // useEffect to clear Title and Content on render of the page and on unmount of page
  useEffect(() => {
    // on initial render useEffect
    dispatch(setCurrentTitle(''));
    dispatch(setCurrentContent(''));
    // on unmount useEffect
    return () => {
      dispatch(setCurrentTitle(''));
      dispatch(setCurrentContent(''));
    };
  }, [dispatch]);
  // function to handle image change
  const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setImage(e.target!.files![0]);
  };
  // handle category change
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }
  function validateInputs() {
    if (title === '' || content === '') {
      return true;
    }
    return false;
  }

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
        category,
      },
      userId,
    };
    const createPost = await dispatch<any>(addNewPost(newPost));
    if (!createPost.error) {
      navigate('/');
    }
  }
  return (
    <StyledNewPost>
      <p data-testid="new-post">New Post</p>
      <select
        value={category}
        id="category"
        onChange={handleChange}
        data-testid="select"
      >
        <option value="">none</option>
        {/* eslint-disable-next-line max-len */}
        {categories.map((categ: Category) => <option key={uuidv4()} value={categ.category}>{categ.category}</option>)}
      </select>
      <form onSubmit={handleSubmit} data-testid="form">
        <div>
          <label htmlFor="title">
            <input
              id="title"
              type="text"
              placeholder="Title of post"
              value={title}
              onChange={(e) => dispatch(setCurrentTitle(e.target.value))}
              data-testid="title-input"
            />
          </label>

          <textarea
            placeholder="Content...."
            id="content"
            value={content}
            onChange={(e) => dispatch(setCurrentContent(e.target.value))}
            data-testid="textarea"
          />
          <input
            type="file"
            onChange={changeImage}
            data-testid="file-input"
          />
        </div>
        <button type="submit" disabled={validateInputs()}>Post</button>
      </form>
    </StyledNewPost>
  );
}

export default NewPost;
