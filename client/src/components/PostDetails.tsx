import React from 'react';
import styled from 'styled-components';
import '../index.css';

type PostProps = {
  post: {
    username: string;
    body: string;
    image: string;
  };
};

const PostDetailsWrapper = styled.section`
  min-height: auto;
  max-height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  img {
    width: 75%;
    height: 10em;
  }
`;
function PostDetails({ post }: PostProps) {
  // eslint-disable-next-line object-curly-newline
  const { username, body, image } = post;
  return (
    <PostDetailsWrapper className="webkit">
      <h1>{username}</h1>
      <p>{body}</p>
      {image && <img src={image} alt="img" />}
    </PostDetailsWrapper>
  );
}

export default PostDetails;
