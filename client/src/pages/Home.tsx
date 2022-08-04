import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import Post from '../components/Post';
import GlobalStyles from '../styles/GlobalStyles';
import Footer from '../components/Footer';
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

function Home() {
  const { loggedIn } = useSelector(
    (state: any) => state.user,
    shallowEqual,
  );
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
        {loggedIn && <Footer />}
      </HomeWrapper>
      {/* <PostWrapper>
        <NewPostBtn />
        <Post />
      </PostWrapper> */}
    </>
  );
}

export default Home;
