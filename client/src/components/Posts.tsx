import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import Post from './Post';

const PostsWrapper = styled.section`
  margin-left: 3vw;
`;
function Posts() {
  const { posts } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  console.log(posts);
  return (
    <PostsWrapper>
      {posts.map((post: any) => (
        <Post
          key={uuidv4()}
          // eslint-disable-next-line no-underscore-dangle
          id={post._id}
          username={post.username}
          title={post.title}
          content={post.body}
          category={post.category}
          date={post.date}
          image={post.image}
        />
      ))}
    </PostsWrapper>
  );
}

export default Posts;
