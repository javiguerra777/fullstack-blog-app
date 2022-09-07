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
import { getAllCategories } from '../store/CategorySlice';
import LoadingSpinner from '../styles/LoadingSpinner';
import { setDisplayFalse } from '../store/UserSlice';

const HomeWrapper = styled.main`
  position: relative;
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .content {
    display: flex;
    flex-direction: row;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  @media (max-width: 576px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 768px) {
    .content {
      flex-direction: column;
      align-items: center;
    }
  }
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
  useEffect(
    () => () => {
      dispatch(setDisplayFalse());
    },
    [dispatch],
  );
  return (
    <>
      <GlobalStyles />
      <HomeWrapper>
        {loggedIn && <Footer />}
        <section className="content">
          {categoriesLoading ? <LoadingSpinner /> : <Filter />}
          {postsLoading ? <LoadingSpinner /> : <Posts />}
        </section>
        {displayLogInPrompt && <LoginPrompt />}
        {displayCamera && <WebcamComponent />}
      </HomeWrapper>
    </>
  );
}

export default Home;
