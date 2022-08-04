import React from 'react';
import styled from 'styled-components';

type PostProps = {
  post: {
    username: string;
    body: string;
    image: string;
  };
};

const PostDetailsWrapper = styled.section`
  height: 35vh;
`;
function PostDetails({ post }: PostProps) {
  const { username, body, image } = post;
  return (
    <PostDetailsWrapper>
      <h1>{username}</h1>
      <p>{body}</p>
      {image && <img src={image} alt="img" />}
    </PostDetailsWrapper>
  );
}

export default PostDetails;
