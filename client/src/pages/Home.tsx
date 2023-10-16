import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import GlobalStyles from '../styles/GlobalStyles';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import Posts from '../components/Posts';
import LoginPrompt from '../components/LoginPrompt';
import WebcamComponent from '../components/WebcamComponent';
import { getAllPosts } from '../store/PostSlice';
import LoadingSpinner from '../styles/LoadingSpinner';
import { useGetAllCategoriesQuery } from '../common/api/categoriesApi';

const HomeWrapper = styled.main`
  position: relative;
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  @media (max-width: 576px) {
    flex-direction: column;
    jusitfy-content: center;
    align-items: center;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    jusitfy-content: center;
    align-items: center;
  }
`;

function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, data } = useGetAllCategoriesQuery('categories');
  const { loggedIn, displayLogInPrompt, displayCamera } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const postsLoading = useSelector(
    (state: RootState) => state.post.loading,
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <>
      <GlobalStyles />
      <HomeWrapper>
        {isLoading ? <LoadingSpinner /> : <Filter data={data} />}
        {postsLoading ? <LoadingSpinner /> : <Posts />}
        {loggedIn && <Footer />}
        {displayLogInPrompt && <LoginPrompt />}
        {displayCamera && <WebcamComponent />}
      </HomeWrapper>
    </>
  );
}

export default Home;
