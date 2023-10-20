/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useGetAllCategoriesQuery } from '../../../common/api/categoriesApi';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';
import { FormContentWrapper } from '../styles/PostForm';
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from '../../../common/api/postsApi';
import { CategoryModel } from '../../../common/models/category';

type EditPostForm = {
  title: string;
  body: string;
};
function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { data } = useGetAllCategoriesQuery('categories');
  const { data: postData } = useGetPostQuery({ id });
  const [updatePostInDB] = useUpdatePostMutation();
  const { id: userId } = UseGetStoreUser();
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: 'all',
    values: {
      title: postData?.title,
      body: postData?.body,
    },
  });
  const [category, setCategory] = useState<string>(
    postData?.category,
  );
  const onSubmit: SubmitHandler<EditPostForm> = async (values) => {
    const payload = {
      user_id: userId,
      title: values.title,
      body: values.body,
      category,
    };
    try {
      await updatePostInDB({ id, payload }).unwrap();
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
      className="flex flex-col w-full items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormContentWrapper>
        <div className="flex justify-between w-full">
          <h2 className="text-2xl">Edit Post</h2>
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

export default EditPost;
