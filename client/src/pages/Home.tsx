import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Post from '../components/Post';
import NewPostBtn from '../components/NewPostBtn';
import GlobalStyles from '../styles/GlobalStyles';
import Filter from '../components/Filter';
import { getAllPosts } from '../store/PostSlice';

const PostWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(getAllPosts());
  }, [dispatch]);
  return (
    <>
      <GlobalStyles />
      <Filter />
      <PostWrapper>
        <NewPostBtn />
        <Post />
      </PostWrapper>
    </>
  );
}

export default Home;
