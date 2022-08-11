import React from 'react';
import styled from 'styled-components';
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlineGif,
} from 'react-icons/ai';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { toggleDisplayCamera } from '../store/UserSlice';
import defaultImage from '../img/default_user_image.png';
import { RootState } from '../store';

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10vh;
  background-color: white;
  border-radius: 0.5em;
  padding: 1em 0.5em 1em 0.5em;
  header {
    display: flex;
    flex-direction: row;
    border-bottom: solid #f2f3f4 0.1em;
    img {
      height: 3em;
      width: 3em;
      cursor: pointer;
      border-radius: 10em;
      margin-right: 0.5em;
    }
    textarea {
      resize: none;
      width: 95%;
      cursor: pointer;
      border: none;
      background: none;
    }
  }
  main {
    margin-top: 0.5em;
    button {
      cursor: pointer;
      background: none;
      border: none;
      margin-right: 1em;
    }
  }
`;

function Footer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { image } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  // eslint-disable-next-line prettier/prettier
  const createNewPost = () => {
    navigate('/newPost');
  };
  return (
    <FooterWrapper>
      <header>
        {/* placeholder image for styling purposes */}
        <img src={image || defaultImage} alt="user-img" />
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
        <button type="button" aria-label="Videos">
          <AiOutlineVideoCamera />
        </button>
        <button
          type="button"
          aria-label="Add New Post"
          onClick={createNewPost}
        >
          <BsFileEarmarkPlus />
        </button>
        <button type="button" aria-label="Add Gif">
          <AiOutlineGif />
        </button>
      </main>
    </FooterWrapper>
  );
}

export default Footer;
