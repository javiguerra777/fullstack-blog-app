/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { CategoryModel } from '../../../common/models/category';
import { useGetAllCategoriesQuery } from '../../../common/api/categoriesApi';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';
import { FormContentWrapper } from '../styles/PostForm';
import { useCreatePostMutation } from '../../../common/api/postsApi';

type PostForm = {
  title: string;
  body: string;
};
function NewPost() {
  const navigate = useNavigate();
  const { data } = useGetAllCategoriesQuery('categories');
  const { id } = UseGetStoreUser();
  const [createPost] = useCreatePostMutation();
  const [category, setCategory] = useState('');
  const [image, setImage] = useState({});
  const [previewImage, setPreviewImage] = useState('');
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<PostForm>({
    mode: 'all',
  });
  const onSubmit: SubmitHandler<PostForm> = async (vals) => {
    const payload = {
      title: vals.title,
      body: vals.body,
      category,
      user_id: id,
    };
    try {
      await createPost({ payload }).unwrap();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  const isFormValid = useMemo(() => {
    if (!category || !isValid) {
      return false;
    }
    return true;
  }, [category, isValid]);
  return (
    <form
      // testid="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full items-center"
    >
      <FormContentWrapper>
        <div className="flex justify-between w-full">
          <h2 className="text-2xl">Create Post</h2>
          <button
            type="submit"
            className={`bg-blue-500 px-3 py-1 rounded ${
              !isFormValid ? 'bg-gray-400' : ''
            }`}
            disabled={!isFormValid}
          >
            Post!
          </button>
        </div>
        <label htmlFor="category" className="category mt-2 text-lg">
          {' '}
          Select Category
        </label>
        <select
          id="category"
          className="text-black rounded py-2 mt-1"
          data-testid="select"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="">None</option>
          {data?.map((value: CategoryModel) => (
            <option key={uuidv4()} value={value.category}>
              {value.category}
            </option>
          ))}
        </select>
        <label htmlFor="title" className="mt-2 text-lg">
          {' '}
          Title
        </label>
        <input
          id="title"
          className="py-2 px-1 rounded mt-1 text-black"
          placeholder="What is your post about?"
          {...register('title', { required: true })}
        />
        <label htmlFor="body" className="text-lg mt-1">
          {' '}
          Content
        </label>
        <textarea
          id="body"
          className="text-black rounded mt-1 px-1 py-2"
          rows={7}
          placeholder="What's on your mind?"
          {...register('body', { required: true })}
        />
      </FormContentWrapper>
    </form>
  );
}

export default NewPost;
