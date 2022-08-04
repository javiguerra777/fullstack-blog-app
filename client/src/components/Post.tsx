/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import logo from '../img/telegram.png';
import convertUnixToDate from '../utils/functions';
import likeBtn from '../img/heart.png';
import colorLikeBtn from '../img/heartRed.png';

const StyledPost = styled.section`
  width: 60vw;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  background: #fff;
  border-radius: 5px;
  position: relative;
  margin: 2rem 0;
  .post-image {
    height: 50px;
    width: 50px;
  }
  & a {
    color: #000;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  & .username {
    position: absolute;
    top: 0;
    left: 0;
    margin: 1rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #0f3d3e;
    & small {
      font-weight: 400;
    }
  }
  & .title {
    position: absolute;
    top: 10%;
    text-align: center;
    font-size: 1.85rem;
  }
  & .category {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1rem;
    font-size: 1.2rem;
  }
  & .content {
    width: 90%;
    line-height: 1.5rem;
    font-weight: 500;
    text-align: center;
  }
  & .edit {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  & .like-btn {
    background: none;
    border: none;
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 1.5rem;
  }
  & img {
    height: 25px;
    width: 25px;
  }
`;

type PostProps = {
  id: string;
  username: string;
  title: string;
  content: string;
  category: string;
  date: number;
  image: string;
};

function Post({
  id,
  username,
  title,
  content,
  category,
  date,
  image,
}: PostProps) {
  const currentUser = useSelector(
    (state: any) => state.user.username,
    shallowEqual,
  );
  // const { loggedIn } = useSelector(
  //   (state: any) => state.user,
  //   shallowEqual,
  // );

  // const addComment = (e: FormEvent<HTMLFormElement>): boolean => {
  //   e.preventDefault();
  //   if (!loggedIn) {
  //     return false;
  //   }
  //   return true;
  // };
  const [isLiked, setIsLiked] = useState<boolean>(false);
  function handleLikes() {
    console.log(isLiked);
    // eslint-disable-next-line no-unused-expressions
    isLiked ? setIsLiked(false) : setIsLiked(true);
  }

  return (
    <StyledPost>
      <p className="username">
        @{username} - <small>{convertUnixToDate(date)}</small>
      </p>
      <Link to={`/post/${id}`} className="title">
        {title}
      </Link>
      <p className="content">{content}</p>
      <p className="category">
        Category: <strong>{category}</strong>
      </p>
      {currentUser === username ? (
        <Link to={`/editPost/${id}`} className="edit">
          edit post...
        </Link>
      ) : (
        <Link className="edit" to={`/post/${id}`}>
          View Post
        </Link>
      )}
      {image && <img className="post-image" src={image} alt="pic" />}
      {isLiked ? (
        <button
          className="like-btn"
          type="button"
          onClick={handleLikes}
        >
          <img src={colorLikeBtn} alt="heart" />
        </button>
      ) : (
        <button
          className="like-btn"
          type="button"
          onClick={handleLikes}
        >
          <img src={likeBtn} alt="heart filled red" />
        </button>
      )}

      {/* <form onSubmit={addComment}>
        <input type="text" placeholder="Share your thoughts..." />
        <button type="submit">
          <img src={logo} alt="Logo of a paper airplane" />
        </button>
      </form> */}
    </StyledPost>
  );
}

export default Post;
