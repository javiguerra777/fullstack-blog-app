/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../store';
// import logo from '../img/telegram.png';
import convertUnixToDate, {
  limitCharacters,
} from '../utils/functions';
import { addLike, removeLike } from '../utils/api';
import likeBtn from '../img/like.png';
import colorLikeBtn from '../img/heartRed.png';
import commentImg from '../img/sms.png';
import { toggleDisplayPrompt } from '../store/UserSlice';
import defaultIcon from '../img/user.png';

export const StyledPost = styled.section`
  width: 65%;
  height: 900px;
  background: #444444;
  border-radius: 5px;
  position: relative;
  margin: 2rem 0;
  & .wrapper {
    padding: 5rem;
  }
  & .user-info {
    position: absolute;
    top: 2vh;
    height: 50px;
    width: 450px;
    display: flex;
    align-items: center;
    margin: 1rem auto;
    & small {
      margin: 0 1rem;
      font-size: 0.25rem;
    }
    & img {
      height: 50px;
      width: 50px;
      margin-right: 20px;
      border-radius: 50%;
    }
    & .username {
      font-weight: 400;
      font-size: 1.25rem;
    }
  }
  & .post-menu-btn {
    position: absolute;
    top: 5vh;
    right: 5vw;
    font-size: 1.5rem;
    cursor: pointer;
  }
  & .post-menu {
    height: 150px;
    width: 100px;
    position: absolute;
    top: 5vh;
    right: 5vw;
    border-radius: 5px;
    background: #171717;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.2);
    z-index: 10;
    & .close {
      background: none;
      border: none;
      color: #da0037;
      margin-bottom: 0.5rem;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    & a {
      color: #ededed;
      text-decoration: none;
      margin: 0.5rem;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  & .title {
    position: absolute;
    top: 11vh;
    margin: 0 auto;
    font-size: 4.5rem;
    font-weigth: 200;
    text-decoration: none;
    color: #ededed;
    &:hover {
      text-decoration: underline;
    }
  }
  & .post-image {
    height: 55%;
    width: 75%;
    position: absolute;
    top: 25vh;
    margin: auto;
  }
  & .interactions {
    position: absolute;
    bottom: 13.5vh;
    margin: auto;
    width: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & button {
      background: none;
      border: none;
      cursor: pointer;
    }
    & img {
      height: 30px;
      width: 30px;
      margin: -1rem 0.55rem;
    }
  }
  & .content {
    position: absolute;
    bottom: 7vh;
    margin: auto;
    width: 75%;
    font-size: 1.2rem;
    & a {
      color: #ededed;
    }
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
  likes: [];
};

function Post({
  id,
  username,
  title,
  content,
  category,
  date,
  image,
  likes,
}: PostProps) {
  // max length for trimming content
  const maxLength = 100;
  const dispatch = useDispatch();
  const {
    loggedIn,
    userId, // users jwt
    id: uniqueUserId, // users id from the database
    username: currentUser,
  } = useSelector((state: RootState) => state.user, shallowEqual);
  // console.log(
  //   `this is the id: ${id}`,
  //   `this is the userId: ${userId}`,
  // );
  const [isLiked, setIsLiked] = useState<boolean>(false);
  // useEffect to determine if a post is liked by a user
  useEffect(() => {
    likes.forEach((like) => {
      if (uniqueUserId === like) {
        setIsLiked(true);
      }
    });
  }, [currentUser, likes, uniqueUserId]);
  async function handleLikes(thisPostId: string) {
    if (!loggedIn) {
      dispatch(toggleDisplayPrompt());
      return 'not logged In';
    }
    // eslint-disable-next-line no-unused-expressions
    isLiked ? setIsLiked(false) : setIsLiked(true);
    // params sent to the server to update the likes array
    const likeParams = {
      postId: thisPostId,
      userId,
      body: { uniqueUserId },
    };
    // this allows the user to add a like to the likes array in the database
    if (!isLiked) {
      await addLike(likeParams);
      return 'sending like';
    }
    // this allows a user to remove a like from the likes array in the database
    await removeLike(likeParams);
    return 'un-liking comment';
  }

  const randomNum = () => {
    const num = Math.floor(Math.random() * 5 + 1);
    return num;
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function openPostMenu() {
    // eslint-disable-next-line no-unused-expressions
    !isOpen ? setIsOpen(true) : setIsOpen(false);
    console.log(isOpen);
  }

  return (
    <StyledPost>
      <div className="wrapper">
        <div className="user-info">
          <img
            src={defaultIcon}
            className="user-icon"
            alt="default user icon"
          />
          <p className="username">@{username}</p>{' '}
          <small>
            <i className="fa-solid fa-circle" />
          </small>
          <p className="timestamp">{convertUnixToDate(date)}</p>{' '}
          <small>
            <i className="fa-solid fa-circle" />
          </small>
          <p className="read-length">{randomNum()} min read</p>
        </div>
        {isOpen ? (
          <div className="post-menu">
            <button
              type="button"
              className="close"
              onClick={openPostMenu}
            >
              Close
            </button>
            {currentUser === username ? (
              <div>
                <Link to="/">Edit Post</Link>
                <Link to="/">Delete Post</Link>
              </div>
            ) : (
              <Link to="/">View Post</Link>
            )}
          </div>
        ) : (
          <div className="post-menu-btn" onClick={openPostMenu}>
            <i className="fa-solid fa-ellipsis-vertical" />
          </div>
        )}
        <Link to={`/post/${id}`} className="title">
          {title}
        </Link>
        {image && (
          <img className="post-image" src={image} alt="pic" />
        )}
        <div className="interactions">
          <div>
            {isLiked ? (
              <button
                className="like-btn"
                type="button"
                onClick={() => handleLikes(id)}
              >
                <img src={colorLikeBtn} alt="heart" />
              </button>
            ) : (
              <button
                className="like-btn"
                type="button"
                onClick={() => handleLikes(id)}
              >
                <img src={likeBtn} alt="heart filled red" />
              </button>
            )}
            <Link to={`/post/${id}`} className="comments">
              <img src={commentImg} alt="text message bubble" />
            </Link>
          </div>

          <p className="category">
            Category:{' '}
            {category === undefined ? (
              <strong>miscellaneous</strong>
            ) : (
              <strong>{category}</strong>
            )}
          </p>
        </div>
        <p className="content">
          {limitCharacters(content, maxLength)}{' '}
          {content.length >= maxLength && (
            <Link to={`/post/${id}`}>...read more</Link>
          )}
        </p>
      </div>
    </StyledPost>
  );
}

export default Post;

// {currentUser === username ? (
//   <Link to={`/editPost/${id}`} className="edit">
//     Edit post
//   </Link>
// ) : (
//   <Link className="edit" to={`/post/${id}`}>
//     View Post
//   </Link>
// )}
