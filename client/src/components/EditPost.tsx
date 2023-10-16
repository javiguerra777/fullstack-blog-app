/* eslint-disable prettier/prettier */
import React, {
  FormEvent, useEffect, useState, ChangeEvent,
} from 'react';
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
import { AppDispatch, RootState } from '../store';
import { StyledNewPost } from './NewPost';
import { useGetAllCategoriesQuery } from '../common/api/categoriesApi';

function EditPost() {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useGetAllCategoriesQuery('categories');
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { title, content } = useSelector(
    (state: RootState) => state.post,
    shallowEqual,
  );
  const { userId } = useSelector((state: RootState) => state.user, shallowEqual);
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    dispatch(getPost(id || ''));
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
  function invalidateInputs() {
    if (!title || !content) {
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
      <h1 data-testid="edit-post-description">Edit Post</h1>
      <label className="category-label" htmlFor="category">
        {' '}
        Select Category
      </label>
      <select
        value={category}
        id="category"
        onChange={handleChange}
        data-testid="select-edit-category"
      >
        <option value="">none</option>
        {/* eslint-disable-next-line max-len */}
        {data?.map((categ: Category) => <option key={uuidv4()} value={categ.category}>{categ.category}</option>)}
      </select>
      <form onSubmit={handleSubmit} data-testid="edit-form">
        <section className="post-content">
          <label htmlFor="title">
            <input
              className="title"
              id="title"
              type="text"
              placeholder="Title of post"
              value={title}
              onChange={(e) => dispatch(setCurrentTitle(e.target.value))}
              data-testid="edit-title"
            />
          </label>

          <textarea
            placeholder="Content...."
            className="content"
            id="content"
            value={content}
            onChange={(e) => dispatch(setCurrentContent(e.target.value))}
            data-testid="edit-content"
          />
        </section>
        <button type="submit" className="submit-form" disabled={invalidateInputs()}>Post</button>
      </form>
    </StyledNewPost>
  );
}

export default EditPost;
