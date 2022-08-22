/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Notification from './Notification';
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
import { deletePost, updateFilteredPosts } from '../store/PostSlice';
import '../styles/notifications.css';
import { PostProps } from '../types/types';

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
    font-weight: 200;
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
`;

function Post({
  id,
  username,
  title,
  content,
  category,
  date,
  image,
  likes,
  comments,
  profilepicture,
}: PostProps) {
  // max length for trimming content
  const maxLength = 100;
  const dispatch = useDispatch();

  // redux states
  const {
    loggedIn,
    userId, // users jwt that is used for authentication purposes in app
    id: uniqueUserId, // users id from the database
    username: currentUser,
  } = useSelector((state: RootState) => state.user, shallowEqual);
  const { posts } = useSelector(
    (state: RootState) => state.post,
    shallowEqual,
  );

  // states used in component
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [likesArray, setLikesArray] = useState(likes);
  const [message, setMessage] = useState('');

  // useEffect to determine if a post is liked by a user
  useEffect(() => {
    likes.forEach((like) => {
      if (uniqueUserId === like) {
        setIsLiked(true);
      }
    });
  }, [currentUser, likes, uniqueUserId]);

  // removes post from database
  const removePost = async (postId: string) => {
    const deleteParams = {
      userId,
      id: postId,
    };
    await dispatch<any>(deletePost(deleteParams));
    const filteredPosts: any[] = [...posts];
    const newPosts = filteredPosts.filter(
      (post) => post._id !== postId,
    );
    dispatch(updateFilteredPosts(newPosts));
    setDeleteMsg(false);
  };

  async function handleLikes(thisPostId: string) {
    if (!loggedIn) {
      dispatch(toggleDisplayPrompt());
      return 'not logged In';
    }
    // params sent to the server to update the likes array
    const likeParams = {
      postId: thisPostId,
      userId,
      body: { uniqueUserId },
    };
    // this allows the user to add a like to the likes array in the database
    if (!isLiked) {
      const likeRequest = await addLike(likeParams);
      /*
      if the post has been deleted we receive null data
       and make sure user is unable to change isLiked State in component
      */
      if (likeRequest === null) {
        setMessage('Unable to like the post, error occurred');
        return 'Unable to like, error occurred';
      }
      /*
      if the post exists, then username is then
      added to current likes array to update current count on the UI
      */
      setLikesArray((prevArray) => [...prevArray, uniqueUserId]);
    } else {
      // this allows a user to remove a like from the likes array in the database
      const unlikeRequest = await removeLike(likeParams);
      /*
      if the post has been deleted we receive null data
       and make sure user is unable to change isLiked State in component
      */
      if (unlikeRequest === null) {
        setMessage('Unable to unlike the post, error occurred');
        return 'Unable to unlike, error occurred';
      }
      /*
      If the post exists, then the array
      is updated to remove the current users id from the array
      this updates the likes array on the UI
       */
      // eslint-disable-next-line prettier/prettier
      const updatedArray = likesArray.filter((like) => like !== uniqueUserId);
      setLikesArray(updatedArray);
    }
    // eslint-disable-next-line no-unused-expressions
    isLiked ? setIsLiked(false) : setIsLiked(true);
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
            src={profilepicture}
            className="user-icon"
            alt="user icon"
          />
          <p className="username" id="username">
            @{username}
          </p>{' '}
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
          <div className="post-menu-btn" onClick={openPostMenu}>
            <i className="fa-solid fa-ellipsis-vertical" />
          </div>
        )}
        <Link to={`/post/${id}`} className="title" id="title">
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
                {likesArray.length > 0 ? likesArray.length : ''}
              </button>
            ) : (
              <button
                className="like-btn"
                type="button"
                onClick={() => handleLikes(id)}
              >
                <img src={likeBtn} alt="heart filled red" />
                {likesArray.length > 0 ? likesArray.length : ''}
              </button>
            )}
            <Link to={`/post/${id}`} className="comments">
              <img src={commentImg} alt="text message bubble" />
              {comments.length > 0 ? comments.length : ''}
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
