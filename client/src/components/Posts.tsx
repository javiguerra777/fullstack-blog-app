/* eslint-disable prettier/prettier */
import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import Post from './Post';
import type { PostModel } from '../common/models/post';

const PostsWrapper = styled.section`
  width: 100%;
  margin-left: 3vw;
  overflow-y: scroll;
  padding-bottom: 10vh;
`;

type Props = {
  data: PostModel[];
}
function Posts({ data }: Props) {
  // fixing bug with array sort method
  const postsForSort = useMemo(() => [...data], [data]);
  return (
    <PostsWrapper>
      {postsForSort
        .sort((a: any, b: any) => (b.created_at - a.created_at))
        .map((post: PostModel) => (
          <Post
            key={uuidv4()}
              // eslint-disable-next-line no-underscore-dangle
            id={post.id}
            username={post.username}
            title={post.title}
            body={post.body}
            category={post.category}
            created_at={post.created_at}
            image={post.image || ''}
            likes={post.likes || []}
            comments={post.comments || []}
            profile_picture={post.profile_picture}
          />
        ))}
    </PostsWrapper>
  );
}

export default Posts;
