import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState, AppDispatch } from '../store';
// import Post from '../components/Post';
import GlobalStyles from '../styles/GlobalStyles';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import Posts from '../components/Posts';
import LoginPrompt from '../components/LoginPrompt';
import WebcamComponent from '../components/WebcamComponent';
import { getAllPosts } from '../store/PostSlice';
import { getAllCategories } from '../store/CategorySlice';
import LoadingSpinner from '../styles/LoadingSpinner';

const HomeWrapper = styled.main`
  position: relative;
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;

function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { loggedIn, displayLogInPrompt, displayCamera } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const postsLoading = useSelector(
    (state: RootState) => state.post.loading,
    shallowEqual,
  );
  const categoriesLoading: boolean = useSelector(
    (state: RootState) => state.category.loading,
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  return (
    <>
      <GlobalStyles />
      <HomeWrapper>
        {categoriesLoading ? <LoadingSpinner /> : <Filter />}
        {postsLoading ? <LoadingSpinner /> : <Posts />}
        {loggedIn && <Footer />}
        {displayLogInPrompt && <LoginPrompt />}
        {displayCamera && <WebcamComponent />}
      </HomeWrapper>
    </>
  );
}

export default Home;
