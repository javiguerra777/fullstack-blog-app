import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Post from './Post';
import { PostModel } from '../../../common/models/post';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';
import UserPostCard from '../../../common/components/UserPostCard';

const PostsWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  data: PostModel[];
};
function Posts({ data }: Props) {
  const { loggedIn } = UseGetStoreUser();
  const [searchParams] = useSearchParams();
  return (
    <PostsWrapper>
      {loggedIn && <UserPostCard />}
      {data
        ?.filter((post) => {
          if (searchParams.get('filter')) {
            return post.category === searchParams.get('filter');
          }
          return post;
        })
        .map((post: PostModel) => (
          <Post
            key={uuidv4()}
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
            user_id={post.user_id}
          />
        ))}
    </PostsWrapper>
  );
}

export default Posts;
