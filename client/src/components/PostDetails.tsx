import React from 'react';
import styled from 'styled-components';
import '../index.css';

const PostDetailsWrapper = styled.section`
  height: 70vh;
  width: 50%;
  border-top: none;
  background: #444444;
  overflow-y: scroll;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px 5px 0 0;
  & p {
    width: 85%;
    font-size: 1.1rem;
  }
  & .username {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 400;
    margin: 1rem;
  }
  & .post-image {
    height: 65%;
    width: 85%;
  }

  @media (max-width: 576px) {
    width: 95%;
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
