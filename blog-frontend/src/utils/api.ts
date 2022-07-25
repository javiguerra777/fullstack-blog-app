import axios from 'axios';

const getAllPosts = async() => {
  const data = await axios.get('http://localhost:5000/api/posts');
  return data;
};
export default getAllPosts;
