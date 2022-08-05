/* eslint-disable prettier/prettier */
import React, {
  FormEvent, useEffect, useState, ChangeEvent,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  setCurrentContent,
  setCurrentTitle,
  getPost,
  editPost,
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

function EditPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { title, content } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  const { categories } = useSelector((state: any) => state.category, shallowEqual);

  const { userId } = useSelector((state: any) => state.user, shallowEqual);
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    dispatch<any>(getPost(id || ''));
    /*
    If the user decides to leave the page
    before submitting the edited post
    this will clear the content and title in the redux slice
    */
    return () => {
      dispatch(setCurrentContent(''));
      dispatch(setCurrentTitle(''));
    };
  }, [id, dispatch]);

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
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const editInformation = {
      userId,
      postId: id,
      post: {
        title,
        body: content,
        date: Date.now(),
        category,
      },
    };
    const editPostResults = await dispatch<any>(editPost(editInformation));
    if (!editPostResults.error) {
      navigate('/');
    }
  }

  return (
    <StyledNewPost>
      <p>Edit Post</p>
      <select
        value={category}
        id="category"
        onChange={handleChange}
      >
        <option value="">none</option>
        {/* eslint-disable-next-line max-len */}
        {categories.map((categ: Category) => <option key={uuidv4()} value={categ.category}>{categ.category}</option>)}
      </select>
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
        <button type="submit" disabled={validateInputs()}>Post</button>
      </form>
    </StyledNewPost>
  );
}

export default EditPost;
