/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { CategoryModel } from '../../../common/models/category';
import { useGetAllCategoriesQuery } from '../../../common/api/categoriesApi';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';
import { FormContentWrapper } from '../styles/PostForm';

type PostForm = {
  title: string;
  body: string;
  category: string;
};
function NewPost() {
  const navigate = useNavigate();
  const { data } = useGetAllCategoriesQuery('categories');
  const { username, id, image: profilepicture } = UseGetStoreUser();
  const { handleSubmit, register } = useForm<PostForm>({
    mode: 'all',
  });
  const onSubmit: SubmitHandler<PostForm> = (vals) => {
    console.log(vals);
  };
  // states used in component
  const [image, setImage] = useState({});
  const [previewImage, setPreviewImage] = useState('');
  return (
    <form
      // testid="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full items-center"
    >
      <FormContentWrapper>
        <div className="flex justify-between w-full">
          <h2 className="text-2xl">New Post</h2>
          <button type="submit">Post!</button>
        </div>
        <label htmlFor="category" className="category mt-2">
          {' '}
          Select Category
        </label>
        <select
          id="category"
          className="text-black"
          data-testid="select"
          {...register('category')}
        >
          <option value="">None</option>
          {data?.map((categ: CategoryModel) => (
            <option key={uuidv4()} value={categ.category}>
              {categ.category}
            </option>
          ))}
        </select>
      </FormContentWrapper>
    </form>
  );
}

export default NewPost;
