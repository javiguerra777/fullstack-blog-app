import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// import Post from '../components/Post';
// import NewPostBtn from '../components/NewPostBtn';
import GlobalStyles from '../styles/GlobalStyles';
import Filter from '../components/Filter';
import Posts from '../components/Posts';
import { getAllPosts } from '../store/PostSlice';
import { getAllCategories } from '../store/CategorySlice';

const HomeWrapper = styled.main`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;
// const PostWrapper = styled.div`
//   height: 100%;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch<any>(getAllCategories());
  }, [dispatch]);
  return (
    <>
      <GlobalStyles />
      <HomeWrapper>
        <Filter />
        <Posts />
      </HomeWrapper>
      {/* <PostWrapper>
        <NewPostBtn />
        <Post />
      </PostWrapper> */}
    </>
  );
}

export default Home;
