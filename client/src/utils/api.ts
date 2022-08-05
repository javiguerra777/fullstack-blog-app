import axios from 'axios';

const urlBase = 'http://localhost:5000/api/';

export type CategoryParams = {
  category: string;
  username: string;
  date: number;
};

export type CategoryData = {
  category: string;
};

// type LikesParams = {
//   postId: string;
//   userId: string;
//   username: string;
// };

export const addLike = async (like: any) => {
  const { data } = await axios.put(
    `${urlBase}/likepost/${like.postId}`,

    like.body,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${like.userId}`,
      },
    },
  );
  return data;
};

export const removeLike = async (unlike: any) => {
  const { data } = await axios.put(
    `${urlBase}/unlikepost/${unlike.postId}`,

    unlike.body,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${unlike.userId}`,
      },
    },
  );
  return data;
};

const addNewCategory = async (category: CategoryParams) => {
  axios.post(`${urlBase}categories`, category);
};

export default addNewCategory;
