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
import LoadingSpinner from '../styles/LoadingSpinner';

type PostState = {
  title: string;
  content: string;
  post: Record<string, unknown>;
  posts: [];
  loading: boolean;
  error: boolean;
};

const HomeWrapper = styled.main`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;

function Home() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(
    (state: any) => state.user,
    shallowEqual,
  );
  const postsLoading = useSelector(
    (state: PostState) => state.post.loading,
    shallowEqual,
  );
  const categoriesLoading: boolean = useSelector(
    (state: any) => state.category.loading,
    shallowEqual,
  );

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
        {categoriesLoading ? <LoadingSpinner /> : <Filter />}
        {postsLoading ? <LoadingSpinner /> : <Posts />}
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
