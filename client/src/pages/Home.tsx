/* eslint-disable operator-linebreak */
import React from 'react';
import styled from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../store';
import GlobalStyles from '../styles/GlobalStyles';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import Posts from '../components/Posts';
import LoginPrompt from '../components/LoginPrompt';
import WebcamComponent from '../components/WebcamComponent';
import LoadingSpinner from '../styles/LoadingSpinner';
import { useGetAllCategoriesQuery } from '../common/api/categoriesApi';
import { useGetAllPostsQuery } from '../common/api/postsApi';

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
  const { isLoading, data } = useGetAllCategoriesQuery('categories');
  const { isLoading: postsLoading, data: posts } =
    useGetAllPostsQuery('posts');
  const { loggedIn, displayLogInPrompt, displayCamera } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  return (
    <>
      <GlobalStyles />
      <HomeWrapper>
        {isLoading ? <LoadingSpinner /> : <Filter data={data} />}
        {postsLoading ? <LoadingSpinner /> : <Posts data={posts} />}
        {loggedIn && <Footer />}
        {displayLogInPrompt && <LoginPrompt />}
        {displayCamera && <WebcamComponent />}
      </HomeWrapper>
    </>
  );
}

export default Home;
