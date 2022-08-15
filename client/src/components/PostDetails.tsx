import React from 'react';
import styled from 'styled-components';
import '../index.css';

const PostDetailsWrapper = styled.section`
  height: 60vh;
  width: 60%;
  border: 1px solid #000;
  border-top: none;
  overflow-y: scroll;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  & username {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 400;
    margin: 2rem;
  }
  & .post-image {
    height: 55%;
    width: 30%;
  }
`;
function PostDetails({ post }: any) {
  // eslint-disable-next-line object-curly-newline
  const { username, body, image } = post;
  return (
    <PostDetailsWrapper className="webkit">
      {image && <img src={image} className="post-image" alt="img" />}
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <h1 className="username">@{username}</h1>
      <p>{body}</p>
    </PostDetailsWrapper>
  );
}

export default PostDetails;
