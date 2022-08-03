import axios from 'axios';

const urlBase = 'http://localhost:5000/api/';

export type PostParams = {
  username: string;
  date: number;
  category?: string;
  title: string;
  body: string;
  image?: string;
};

export type CategoryParams = {
  category: string;
  username: string;
  date: number;
};

export type PostData = {
  username: string;
  body: string;
  category: string;
  title: string;
  date: number;
};

export type CategoryData = {
  category: string;
};

// post requests
export const addNewPost = async (post: PostParams) => {
  axios.post(`${urlBase}posts`, post);
};

const addNewCategory = async (category: CategoryParams) => {
  axios.post(`${urlBase}categories`, category);
};

export default addNewCategory;
