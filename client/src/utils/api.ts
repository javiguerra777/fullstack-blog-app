import axios from 'axios';

const urlBase = 'http://localhost:5000/api/';

type CategoryParams = {
  category: string;
  username: string;
  date: number;
};

// type ImageParams = {
//   userId: string;
//   post: {
//     username: string;
//     title: string;
//     body: string;
//     date: number;
//     profilepicture: string;
//     category: string;
//     imageKey: string;
//   };
// };

type LikesParams = {
  postId: string;
  userId: string;
  body: {
    uniqueUserId: string;
  };
};

export const addLike = async (like: LikesParams) => {
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

export const removeLike = async (unlike: LikesParams) => {
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
  const data = axios.post(`${urlBase}categories`, category);
  return data;
};

export default addNewCategory;
