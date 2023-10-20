import React from 'react';
import {
  AiOutlineCamera,
  // AiOutlineVideoCamera,
  // AiOutlineGif,
} from 'react-icons/ai';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { toggleDisplayCamera } from '../../store/UserSlice';
import defaultImage from '../../assets/img/default_user_image.png';
import { RootState } from '../../store';
import { PostCardContainer } from '../styles/PostCard';

export default function UserPostCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { image } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  // eslint-disable-next-line prettier/prettier
  const createNewPost = () => {
    navigate('/post/new-post');
  };
  return (
    <PostCardContainer>
      <header>
        {/* placeholder image for styling purposes */}
        <img
          src={image === 'default' ? defaultImage : image}
          alt="user-img"
        />
        <textarea
          name="sharePost"
          id="sharePost"
          placeholder="Share what's on your mind..."
          onClick={createNewPost}
        />
      </header>
      <main>
        <button
          type="button"
          aria-label="Photos"
          onClick={() => dispatch(toggleDisplayCamera())}
        >
          <AiOutlineCamera />
        </button>
        {/* <button type="button" aria-label="Videos">
          <AiOutlineVideoCamera />
        </button> */}
        <button
          type="button"
          aria-label="Add New Post"
          onClick={createNewPost}
        >
          <BsFileEarmarkPlus />
        </button>
        {/* <button type="button" aria-label="Add Gif">
          <AiOutlineGif />
        </button> */}
      </main>
    </PostCardContainer>
  );
}
