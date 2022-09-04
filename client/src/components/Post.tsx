/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Notification from './Notification';
import { RootState } from '../store';
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
import defaultIcon from '../img/default_user_image.png';
import StyledPost, { DeleteWrapper } from '../styles/PostStyles';

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
      if (uniqueUserId === like.userId) {
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
      body: { uniqueUserId, username: currentUser },
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
      const updatedArray = likesArray.filter((like) => like.userId !== uniqueUserId);
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
        <header className="post-header">
          <div className="user-info">
            <img
              src={profilepicture || defaultIcon}
              className="user-icon"
              alt="user icon"
            />
            <p className="username" id="username">
              @<Link to={`/profile/${username}`}>{username}</Link>
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
                  <Link className="editPost" to={`editPost/${id}`}>
                    Edit Post
                  </Link>
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
        </header>
        <main className="post-main">
          <Link to={`/post/${id}`} className="title" id="title">
            {title}
          </Link>
          {image && (
            <img className="post-image" src={image} alt="pic" />
          )}
        </main>
        <footer className="interactions">
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
        </footer>
        <section className="post-body">
          <p>
            {limitCharacters(content, maxLength)}{' '}
            {content.length >= maxLength && (
              <Link className="readMore" to={`/post/${id}`}>
                ...read more
              </Link>
            )}
          </p>
        </section>
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
