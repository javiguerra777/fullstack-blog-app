import axios from 'axios';

const urlBase = 'http://localhost:5000/api/';

export type PostParams = {
  username: string;
  date: number;
  category?: string;
  title: string;
  body: string;
  image?: string;
}

export type CategoryParams = {
  category: string;
  username: string;
  date: number;
}

// get requests
const getAllPosts = async() => {
  const data = await axios.get(`${urlBase}posts`);
  return data;
};

export const getAllCategories = async () => {
  const data = await axios.get(`${urlBase}categories`);
  return data;
};

// post requests
export const addNewPost = async (post: PostParams) => {
  axios.post(`${urlBase}posts`, post);
};

export const addNewCategory = async (category: CategoryParams) => {
  axios.post(`${urlBase}categories`, category);
};

export default getAllPosts;
