/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Notification from './Notification';
import { RootState } from '../store';
import convertUnixToDate, {
  limitCharacters,
} from '../utils/functions';
import likeBtn from '../assets/img/like.png';
import colorLikeBtn from '../assets/img/heartRed.png';
import commentImg from '../assets/img/sms.png';
import '../styles/notifications.css';
import { PostModel } from '../common/models/post';

const DeleteWrapper = styled.section`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .delete-prompt {
    position: absolute;
    top: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #171717;
    height: auto;
    width: auto;
    padding: 0 1.5em 1em 1.5em;
    h1 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export const StyledPost = styled.section`
  height: 900px;
  width: 65%;
  background: #444444;
  border-radius: 5px;
  position: relative;
  margin: 2rem 0;
  .comments {
    text-decoration: none;
    color: white;
  }
  .like-btn {
    color: white;
  }
  & .wrapper {
    padding: 2rem;
  }
  & .user-info {
    position: absolute;
    top: 2vh;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    margin: 1rem auto;
    & p {
      font-size: 1rem;
    }
    & small {
      margin: 0 1rem;
      font-size: 0.15rem;
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
    font-weight: 200;
    text-decoration: none;
    color: #ededed;
    &:hover {
      text-decoration: underline;
    }
  }
  & .post-image {
    height: 55%;
    width: 90%;
    position: absolute;
    top: 21vh;
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
    bottom: 2.5vh;
    margin: auto;
    width: 75%;
    font-size: 1.2rem;
    & a {
      color: #ededed;
    }
  }
  .delete-post {
    background: none;
    border: none;
    color: #ededed;
    cursor: pointer;
  }
  .delete-post: hover {
    text-decoration: underline;
  }
  @media (max-width: 576px) {
    margin: 1rem 0.25rem;
    & .wrapper {
      padding: 0;
    }
    & .user-info {
      width: 90%;
      & img {
        margin: 0 1rem;
      }
    }
    & .title {
      margin: 0 1rem;
    }
    & .post-image {
      width: 100%;
    }
    & .interactions {
      width: 95%;
    }
    & .content {
      width: 100%;
      bottom: 5vh;
      padding: 0 0.75rem;
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    word-wrap: break-word;
    overflow-x: hidden;
    width: 95%;
    font-size: 0.7rem;
    margin: 1rem auto;
    & .post-image {
      top: 17vh;
    }
    .category {
      position: absolute;
      bottom: 2em;
      right: 0;
    }
    .comments {
      position: absolute;
      bottom: 3.5em;
      left: 6em;
    }
    .like-btn {
      position: absolute;
      bottom: 3em;
    }
    .title {
      font-size: 3em;
    }
    .user-info {
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
        font-size: 1rem;
      }
    }
  }
  @media (max-width: 1025px) {
    width: 90%;
    .user-info {
      & p {
        font-size: 0.75rem;
      }
    }
  }
`;

function Post({
  id,
  username,
  title,
  body,
  category,
  created_at,
  image,
  likes,
  comments,
  profile_picture,
  user_id,
}: PostModel) {
  // max length for trimming content
  const maxLength = 100;
  const dispatch = useDispatch();

  // redux states
  const {
    loggedIn,
    id: userIdNumber, // users id from the database
    username: userUsername,
  } = useSelector((state: RootState) => state.user, shallowEqual);

  // states used in component
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [message, setMessage] = useState('');

  const toggleLike = () => {
    if (!loggedIn) return;
    setIsLiked((prev) => !prev);
  };
  // removes post from database
  const removePost = async (postId: number) => {
    setDeleteMsg(false);
  };

  const randomNum = () => {
    const num = Math.floor(Math.random() * 5 + 1);
    return num;
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function openPostMenu() {
    // eslint-disable-next-line no-unused-expressions
    !isOpen ? setIsOpen(true) : setIsOpen(false);
  }
  // opens delete message prompt and closes the post menu
  const displayDeleteMessage = () => {
    setDeleteMsg(true);
    openPostMenu();
  };
  // function to clear any notifications
  const clearMessage = () => {
    setMessage('');
  };

  // clears message notification after a set time if user has not cleared it already
  if (message) {
    setTimeout(() => {
      setMessage('');
    }, 5000);
  }
  return (
    <StyledPost>
      <div className="wrapper">
        <div className="user-info">
          <img
            src={profile_picture}
            className="user-icon"
            alt="user icon"
          />
          <p className="username" id="username">
            @{username}
          </p>{' '}
          <small>
            <i className="fa-solid fa-circle" />
          </small>
          <p className="timestamp">{convertUnixToDate(created_at)}</p>{' '}
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
            {userIdNumber === user_id ? (
              <div>
                <Link to={`editPost/${id}`}>Edit Post</Link>
                <button
                  type="button"
                  className="delete-post"
                  onClick={displayDeleteMessage}
                >
                  Delete Post
                </button>
              </div>
            ) : (
              <Link to={`post/${id}`}>View Post</Link>
            )}
          </div>
        ) : (
          <button
            type="button"
            className="post-menu-btn"
            onClick={openPostMenu}
          >
            <i className="fa-solid fa-ellipsis-vertical" />
          </button>
        )}
        <Link to={`/post/${id}`} className="title" id="title">
          {title}
        </Link>
        {image && (
          <img className="post-image" src={image} alt="pic" />
        )}
        <div className="interactions">
          <div>
            <button
              className="like-btn"
              type="button"
              onClick={toggleLike}
            >
              <img
                src={isLiked ? colorLikeBtn : likeBtn}
                alt="like-btn"
              />
            </button>
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
          {limitCharacters(body, maxLength)}{' '}
          {body.length >= maxLength && (
            <Link to={`/post/${id}`}>...read more</Link>
          )}
        </p>
      </div>
      {message && (
        <div className="post-notification">
          <Notification
            message={message}
            clearMessage={clearMessage}
          />
        </div>
      )}
      {deleteMsg && (
        <DeleteWrapper>
          <section className="delete-prompt">
            <h1>Are you sure you want to delete this post?</h1>
            <p>
              If you delete this post, the data cannot be retrieved in
              the future.
            </p>
            <footer>
              <button type="button" onClick={() => removePost(id)}>
                Yes
              </button>
              <button
                type="button"
                onClick={() => setDeleteMsg(false)}
              >
                No
              </button>
            </footer>
          </section>
        </DeleteWrapper>
      )}
    </StyledPost>
  );
}

export default Post;
