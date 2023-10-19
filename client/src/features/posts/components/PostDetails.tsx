import React from 'react';
import styled from 'styled-components';
import defaultIcon from '../../../assets/img/default_user_image.png';

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
  & .user-info {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    margin: 0.85rem;
    & img {
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
  }
  & .username {
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
  @media (max-width: 768px) {
    width: 90%;
  }
`;
function PostDetails({ post }: any) {
  // eslint-disable-next-line object-curly-newline
  const { username, body, image, profilepicture } = post;
  return (
    <PostDetailsWrapper className="webkit">
      <div className="user-info">
        <img src={profilepicture || defaultIcon} alt="user icon" />
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <h1 className="username">@{username}</h1>
      </div>
      {image && <img src={image} className="post-image" alt="img" />}
      <p>{body}</p>
    </PostDetailsWrapper>
  );
}

export default PostDetails;
