import axios from 'axios';

const urlBase = 'http://localhost:5000/api/';

type CategoryParams = {
  category: string;
  username: string;
  date: number;
};

type LikesParams = {
  postId: string;
  userId: string;
  body: {
    uniqueUserId: string;
  };
};

type ResetPasswordParams = {
  token: string;
  body: {
    password: string;
  };
};

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
  request: Record<string, unknown>,
) => {
  await axios.post(`${urlBase}user`, request);
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
