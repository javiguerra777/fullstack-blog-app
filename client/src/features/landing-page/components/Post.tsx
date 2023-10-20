/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Notification from '../../../components/Notification';
import convertUnixToDate, {
  limitCharacters,
} from '../../../utils/functions';
import likeBtn from '../../../assets/img/like.png';
import colorLikeBtn from '../../../assets/img/heartRed.png';
import commentImg from '../../../assets/img/sms.png';
import { PostModel } from '../../../common/models/post';
import { DeleteWrapper } from '../styles/Delete';
import { StyledPost } from '../styles/PostStyle';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';
import default_icon from '../../../assets/img/default_user_image.png';

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
  const maxLength = useMemo(() => 100, []);
  // redux states
  const {
    loggedIn,
    id: userIdNumber, // users id from the database
  } = UseGetStoreUser();

  // states used in component
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const toggleLike = () => {
    if (!loggedIn) return;
    setIsLiked((prev) => !prev);
  };

  const randomNum = useMemo(() => {
    const num = Math.floor(Math.random() * 5 + 1);
    return num;
  }, []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function openPostMenu() {
    setIsOpen((prev) => !prev);
  }
  // opens delete message prompt and closes the post menu
  const deletePost = () => {
    const answer = window.confirm('Delete post?');
    if (answer) {
      console.log('Post will be deleted');
    }
  };
  return (
    <StyledPost>
      <div className="flex justify-between relative">
        <div className="flex">
          <img
            src={
              profile_picture === 'default'
                ? default_icon
                : profile_picture
            }
            className="h-20 w-20 rounded-lg"
            alt="user icon"
          />
          <div className="ml-3">
            <p className="username" id="username">
              @{username}
            </p>
            <div className="flex items-center">
              <i className="fa-solid fa-circle small-dot" />
              <p className="ml-1 text-sm">
                {convertUnixToDate(created_at)}
              </p>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-circle small-dot" />
              <p className="ml-1 text-sm">{randomNum} min read</p>
            </div>
          </div>
        </div>
        {isOpen ? (
          <div className="absolute top-0 right-0 flex flex-col bg-black p-2 rounded w-40">
            <button
              type="button"
              className="close text-red-600 text-lg"
              onClick={openPostMenu}
            >
              Close Menu
            </button>
            {userIdNumber === user_id && (
              <div className="flex flex-col">
                <Link
                  to={`/post/edit-post/${id}`}
                  className="bg-green-700 p-2 rounded my-3 hover:bg-green-500 text-center"
                >
                  Edit Post
                </Link>
                <button
                  type="button"
                  className="bg-red-700 p-2 rounded hover:bg-red-500 text-center"
                  onClick={deletePost}
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            className="absolute top-0 right-0"
            onClick={openPostMenu}
          >
            <i className="fa-solid fa-ellipsis-vertical text-2xl" />
          </button>
        )}
      </div>
      <Link
        to={`/post/details/${id}`}
        className="hover:underline text-3xl"
      >
        {title}
      </Link>
      {image && <img className="post-image" src={image} alt="pic" />}
      <div className="flex justify-between">
        <div className="flex">
          <button
            className="h-10 w-10"
            type="button"
            onClick={toggleLike}
          >
            <img
              src={isLiked ? colorLikeBtn : likeBtn}
              alt="like-btn"
            />
          </button>
          <Link to={`/post/details/${id}`} className="h-10 w-10 ml-3">
            <img src={commentImg} alt="text message bubble" />
          </Link>
        </div>
        <p className="category">
          Category:{' '}
          {!category ? (
            <strong>miscellaneous</strong>
          ) : (
            <strong>{category}</strong>
          )}
        </p>
      </div>
      <p className="text-lg">
        {limitCharacters(body, maxLength)}{' '}
        {body.length >= maxLength && (
          <Link to={`/post/${id}`} className="hover:undelrine">
            ...read more
          </Link>
        )}
      </p>
    </StyledPost>
  );
}

export default Post;
