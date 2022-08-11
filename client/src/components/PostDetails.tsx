import React from 'react';
import styled from 'styled-components';
import '../index.css';

const PostDetailsWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .post-image {
    width: 50vw;
    height: auto;
  }
`;
function PostDetails({ post }: any) {
  // eslint-disable-next-line object-curly-newline
  const { username, body, image } = post;
  return (
    <PostDetailsWrapper className="webkit">
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <h1>@{username}</h1>
      <p>{body}</p>
      {image && <img src={image} className="post-image" alt="img" />}
    </PostDetailsWrapper>
  );
}

export default PostDetails;
