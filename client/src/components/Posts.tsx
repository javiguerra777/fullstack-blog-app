/* eslint-disable prettier/prettier */
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { RootState } from '../store';
import Post from './Post';

const PostsWrapper = styled.section`
  width: 60%;
  margin-left: 3vw;
  overflow-y: scroll;
  padding-bottom: 10vh;
`;
type PostsType = {
  body: string;
  category: string;
  date: number;
  title: string;
  username: string;
  __v: number;
  _id: string;
  image?: string;
  likes?: [];
};

function Posts() {
  const { posts } = useSelector(
    (state: RootState) => state.post,
    shallowEqual,
  );
  // fixing bug with array sort method
  const postsForSort = [...posts];
  return (
    <PostsWrapper>
      {postsForSort.length > 0
        && postsForSort
          .sort((a: PostsType, b: PostsType) => (b.date - a.date))
          .map((post: PostsType) => (
            <Post
              key={uuidv4()}
              // eslint-disable-next-line no-underscore-dangle
              id={post._id}
              username={post.username}
              title={post.title}
              content={post.body}
              category={post.category}
              date={post.date}
              image={post.image || ''}
              likes={post.likes || []}
            />
          ))}
    </PostsWrapper>
  );
}

export default Posts;
