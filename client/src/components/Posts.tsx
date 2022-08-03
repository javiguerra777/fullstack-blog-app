import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import Post from './Post';

const PostsWrapper = styled.section`
  margin-left: 3vw;
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
};

function Posts() {
  const { posts } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  return (
    <PostsWrapper>
      {posts
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
          />
        ))
        // eslint-disable-next-line comma-dangle, prettier/prettier, no-confusing-arrow
        .sort((a: PostsType, b: PostsType) => a.date < b.date ? 1 : -1,)}
    </PostsWrapper>
  );
}

export default Posts;
