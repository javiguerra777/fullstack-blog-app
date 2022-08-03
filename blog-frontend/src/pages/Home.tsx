import React from 'react';
import styled from 'styled-components';
import Post from '../components/Post';
import NewPostBtn from '../components/NewPostBtn';
import GlobalStyles from '../styles/GlobalStyles';
import Filter from '../components/Filter';

const PostWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function Home() {
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
