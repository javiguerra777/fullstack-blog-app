/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import defaultIcon from '../img/user.png';

const PostDetailsWrapper = styled.section`
  height: auto;
  width: 93%;
  border-top: none;
  background: #444444;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-radius: 5px 5px 0 0;
  border-bottom: solid black 1px;
  .user-info {
    header: width: 100%;
    display: flex; 
    flex-direction: row;
    align-items: center;
    .prof-img {
      margin-left: 1em;
      height: 50px;
      width: 50px;
      border-radius: 3em;
    }
    .username {
      margin-left: 0.5em;
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .post-image {
      height: 30em;
      width: 95%;
    }
  }
`;
function PostDetails({ post }: any) {
  // eslint-disable-next-line object-curly-newline
  const { username, body, image, profilepicture } = post;
  return (
    <PostDetailsWrapper className="webkit">
      <header className="user-info">
        <img
          className="prof-img"
          src={profilepicture || defaultIcon}
          alt="user icon"
        />
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <h1 className="username">
          @<Link to={`/profile/${username}`}>{username}</Link>
        </h1>
      </header>
      <main className="main-content">
        {image && (
          <img src={image} className="post-image" alt="img" />
        )}
        <p>{body}</p>
      </main>
    </PostDetailsWrapper>
  );
}

export default PostDetails;
