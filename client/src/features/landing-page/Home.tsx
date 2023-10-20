import React from 'react';
import styled from 'styled-components';
import Filter from './components/Filter';
import Posts from './components/Posts';
import LoginPrompt from '../../common/components/LoginPrompt';
import WebcamComponent from '../../components/WebcamComponent';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import { useGetAllCategoriesQuery } from '../../common/api/categoriesApi';
import { useGetAllPostsQuery } from '../../common/api/postsApi';
import UseGetStoreUser from '../../common/hooks/UseGetStoreUser';
import { PageHeight } from '../../common/styles/StyleVariables';

const HomeWrapper = styled.main`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: ${PageHeight};
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 800px) {
    flex-direction: row;
    align-items: normal;
  }
`;

function Home() {
  const { isLoading, data } = useGetAllCategoriesQuery('categories');
  const { isLoading: postsLoading, data: posts } =
    useGetAllPostsQuery('posts');
  const { displayLogInPrompt, displayCamera } = UseGetStoreUser();
  return (
    <HomeWrapper>
      {isLoading ? <LoadingSpinner /> : <Filter data={data} />}
      {postsLoading ? <LoadingSpinner /> : <Posts data={posts} />}
      {displayLogInPrompt && <LoginPrompt />}
      {displayCamera && <WebcamComponent />}
    </HomeWrapper>
  );
}

export default Home;
