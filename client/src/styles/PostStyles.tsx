import styled from 'styled-components';

export const DeleteWrapper = styled.section`
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
    button {
      margin-right: 1em;
      margin-left: 1em;
    }
  }
`;

const StyledPost = styled.section`
  height: auto;
  width: 65%;
  background: #444444;
  border-radius: 5px;
  position: relative;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  .post-header {
    height: 5em;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0.5em;
  }
  .post-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-bottom: 1em;
    .title {
      margin-bottom: 0.5em;
    }
  }
  .comments {
    text-decoration: none;
    color: white;
  }
  .like-btn {
    color: white;
  }
  & .wrapper {
    background: #444444;
    padding: 2rem;
  }
  & .user-info {
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
    font-size: 1.5rem;
    cursor: pointer;
  }
  & .post-menu {
    display: flex;
    flex-direction: column;
    height: auto;
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
      margin-top: 1em;
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
    margin: auto;
  }
  & .interactions {
    margin-top: 1em;
    margin-bottom: 1em;
    width: 95%;
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
    background: none;
    word-wrap: break-word;
    text-align: center;
    height: auto;
    margin-bottom: 0.5em;
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
    margin-top: 0.5em;
  }
  .delete-post: hover {
    text-decoration: underline;
  }
  a {
    color: white;
    text-decoration: none;
  }
  .readMore {
    text-decoration: underline;
  }
  .post-body {
    width: 90%;
    margin-left: 1em;
    font-size: 1.2rem;
  }
  // media queries
  @media (max-width: 576px) {
    margin: 0 auto;
    & .wrapper {
      padding: 0;
    }
    & .user-info {
      width: 100%;
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
export default StyledPost;
