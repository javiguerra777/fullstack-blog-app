import axios from 'axios';
import {
  LikesParams,
  CategoryParams,
  ResetPasswordParams,
  ValidateEmail,
} from '../types/types';

const urlBase = 'https://rest-api-blog-backend.herokuapp.com/api/';

export const addLike = async ({
  postId,
  userId,
  body,
}: LikesParams) => {
  const { data } = await axios.put(
    `${urlBase}/likepost/${postId}`,

    body,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userId}`,
      },
    },
  );
  return data;
};

export const removeLike = async ({
  postId,
  userId,
  body,
}: LikesParams) => {
  const { data } = await axios.put(
    `${urlBase}/unlikepost/${postId}`,

    body,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userId}`,
      },
    },
  );
  return data;
};

const addNewCategory = async (category: CategoryParams) => {
  const { data } = await axios.post(`${urlBase}categories`, category);
  return data;
};

export const getUsers = async () => axios.get(`${urlBase}users`);

export const validateEmailOnServer = async (
  request: ValidateEmail,
) => {
  const { data } = await axios.post(`${urlBase}user`, request);
  return data;
};
export const validateUserOnServer = async (token: string) => {
  const { data } = await axios.get(`${urlBase}validateUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const resetPassword = async ({
  body,
  token,
}: ResetPasswordParams) => {
  const { data } = await axios.put(`${urlBase}resetPassword`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export default addNewCategory;
