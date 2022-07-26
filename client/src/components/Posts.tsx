/* eslint-disable prettier/prettier */
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { RootState } from '../store';
import Post from './Post';
import { Date, PostType } from '../types/types';

const PostsWrapper = styled.section`
  width: 100%;
  margin-left: 3vw;
  overflow-y: scroll;
  padding-bottom: 10vh;
`;

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
          .sort((a: Date, b: Date) => (b.date - a.date))
          .map((post: PostType) => (
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
              comments={post.comments || []}
              profilepicture={post.profilepicture}
            />
          ))}
    </PostsWrapper>
  );
}

export default Posts;
