import React, {
  FormEvent,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch, RootState } from '../store';
import {
  setCurrentContent,
  setCurrentTitle,
  addNewPost,
} from '../store/PostSlice';
import { Category } from '../types/types';
import { useGetAllCategoriesQuery } from '../common/api/categoriesApi';
import UseGetStoreUser from '../common/hooks/UseGetStoreUser';

export const StyledNewPost = styled.section`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .preview-img {
    width: 200px;
    height: 100px;
  }
  & p {
    font-size: 2.75rem;
  }
  & form {
    height: 70vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .post-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & .prof-img-file {
        border: none;
      }
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
      background: black;
      cursor: default;
    }
  }
  .category-label {
    margin-bottom: 5px;
  }
  select {
    width: 20rem;
    cursor: pointer;
  }

  @media (max-width: 700px) {
    select {
      width: 30vw;
    }
    & form {
      & #title {
        width: 75vw;
      }
      & #content {
        width: 70vw;
      }
      & #file {
        width: 75vw;
      }
      & .submit-form {
        width: 70vw;
      }
    }
  }
`;

function NewPost() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetAllCategoriesQuery('categories');

  // redux useSelectors
  const { title, content } = useSelector(
    (state: RootState) => state.post,
    shallowEqual,
  );
  const { username, id, image: profilepicture } = UseGetStoreUser();

  // states used in component
  const [image, setImage] = useState({});
  const [previewImage, setPreviewImage] = useState('');
  const [category, setCategory] = useState<string>();

  // useEffect to clear Title and Content on render of the page and on unmount of page
  useEffect(() => {
    // on initial render useEffect
    dispatch(setCurrentTitle(''));
    dispatch(setCurrentContent(''));
    // on unmount useEffect if user leaves page without submitting form
    return () => {
      dispatch(setCurrentTitle(''));
      dispatch(setCurrentContent(''));
    };
  }, [dispatch]);
  // function to handle image change
  const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPreviewImage('');
      return;
    }
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  // handle category change
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }
  function invalidateInputs() {
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
        profilepicture,
        category,
      },
      id,
    };
    const createPost = await dispatch<any>(addNewPost(newPost));
    if (!createPost.error) {
      navigate('/');
    }
  }
  return (
    <StyledNewPost>
      <h1 data-testid="new-post">New Post</h1>
      <label className="category-label" htmlFor="category">
        {' '}
        Select Category
      </label>
      <select
        value={category}
        id="category"
        onChange={handleChange}
        data-testid="select"
      >
        <option value="">none</option>
        {/* eslint-disable-next-line max-len */}
        {data?.map((categ: Category) => (
          <option key={uuidv4()} value={categ.category}>
            {categ.category}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit} data-testid="form">
        <section className="post-content">
          <label htmlFor="title">
            <input
              id="title"
              className="title"
              type="text"
              placeholder="Title of post"
              value={title}
              onChange={(e) =>
                dispatch(setCurrentTitle(e.target.value))
              }
              data-testid="title-input"
            />
          </label>

          <textarea
            placeholder="Content...."
            className="content"
            id="content"
            value={content}
            onChange={(e) =>
              dispatch(setCurrentContent(e.target.value))
            }
            data-testid="textarea"
          />
          <input
            type="file"
            id="file"
            onChange={changeImage}
            data-testid="file-input"
            className="prof-img-file"
          />
        </section>
        {previewImage && (
          <img
            className="preview-img"
            src={previewImage}
            alt="file-img"
          />
        )}
        <button
          className="submit-form"
          type="submit"
          disabled={invalidateInputs()}
        >
          Post
        </button>
      </form>
    </StyledNewPost>
  );
}

export default NewPost;
