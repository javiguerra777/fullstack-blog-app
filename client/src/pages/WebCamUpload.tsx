import React, {
  FormEvent,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
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
import { StyledNewPost } from '../features/posts/pages/NewPost';
import { useGetAllCategoriesQuery } from '../common/api/categoriesApi';
import UseGetStoreUser from '../common/hooks/UseGetStoreUser';

function WebCamUpload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetAllCategoriesQuery('categories');
  const { title, content, image } = useSelector(
    (state: RootState) => state.post,
    shallowEqual,
  );
  const {
    username,
    token,
    image: profilepicture,
  } = UseGetStoreUser();
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
      token,
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
    const uploadPostAttempt = await dispatch<any>(
      addWebCamImage(uploadImage),
    );
    if (!uploadPostAttempt.error) {
      navigate('/');
    }
  }
  return (
    <StyledNewPost>
      <h1 data-testid="image-post-description">Upload Image</h1>
      <label className="category-label" htmlFor="category">
        {' '}
        Select Category
      </label>
      <select
        value={category}
        id="category"
        onChange={handleChange}
        data-testid="select-image-category"
      >
        <option value="">none</option>
        {/* eslint-disable-next-line max-len */}
        {data?.map(({ category: theCategory }: Category) => (
          <option key={uuidv4()} value={theCategory}>
            {theCategory}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit} data-testid="image-form">
        <section className="post-content">
          <label htmlFor="title">
            <input
              id="title"
              type="text"
              placeholder="Title of post"
              value={title}
              onChange={(e) =>
                dispatch(setCurrentTitle(e.target.value))
              }
              data-testid="image-title"
            />
          </label>

          <textarea
            placeholder="Content...."
            id="content"
            value={content}
            onChange={(e) =>
              dispatch(setCurrentContent(e.target.value))
            }
            data-testid="image-content"
          />
        </section>
        <button
          type="submit"
          className="submit-form"
          disabled={invalidateInputs()}
        >
          Post
        </button>
      </form>
    </StyledNewPost>
  );
}

export default WebCamUpload;
