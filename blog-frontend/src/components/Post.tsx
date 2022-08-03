import React from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import logo from '../img/telegram.png';

const StyledPost = styled.section`
  width: 65%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  background: #fff;
  border-radius: 5px;
  position: relative;
  margin: 2rem 0;
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
  }
  & .title {
    position: absolute;
    top: 0;
    right: 50%;
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
  & form {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 1rem;
    & input {
      width: 35%;
      height: 30px;
      border-radius: 15px;
      border: 1px solid #000;
      &:focus {
        border: none;
      }
    }
    & button {
      background: none;
      border: none;
      transform: translate(-45px, 5px);
      cursor: pointer;
      & img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

function Post() {
  const { id, username, title, content, category } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  console.log(id);
  return (
    <StyledPost>
      <p className="username">@{username}</p>
      <Link to={`/post/${id}`} className="title">
        {title}
      </Link>
      <p className="content">{content}</p>
      <p className="category">
        Category: <strong>{category}</strong>
      </p>
      <Link to={`/editPost/${id}`} className="edit">
        edit post...
      </Link>
      <form>
        <input type="text" placeholder="Share your thoughts..." />
        <button type="submit">
          <img src={logo} alt="Logo of a paper airplane" />
        </button>
      </form>
    </StyledPost>
  );
}

export default Post;
