import React, { useEffect, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../store';
import PostDetails from '../components/PostDetails';
// eslint-disable-next-line no-unused-vars
import CommentSection from '../components/CommentSection';
import Notification from '../components/Notification';
import { getPost } from '../store/PostSlice';
import {
  getComments,
  changeComment,
  changeComments,
} from '../store/CommentSlice';
import LoadingSpinner from '../styles/LoadingSpinner';
import '../styles/notifications.css';

const PostWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  & .add-comment {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form-container {
    height: 6vh;
    width: 50%;
    background: #444444;
    display: flex;
    align-items: center;
    border-radius: 0 0 5px 5px;
    & input {
      width: 500px;
      height: 30px;
      margin-left: 1rem;
      border-radius: 15px;
      border: none;
    }
  }
  img {
    height: 50px;
    width: 50px;
  }
  & button {
    background: none;
    border: none;
    font-size: 1.25rem;
    transform: translateX(-50px);
  }
`;

// create connection with socket.io server
const socket = io('http://localhost:5500');

function Post() {
  const { id } = useParams<string>();
  const dispatch: AppDispatch = useDispatch();
  const { username, image: profilepicture } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const { post, loading } = useSelector(
    (state: RootState) => state.post,
    shallowEqual,
  );
  const {
    comment,
    comments,
    loading: commentLoading,
  } = useSelector((state: RootState) => state.comment, shallowEqual);
  // message used for the notifications
  const [message, setMessage] = useState('');

  // grab post by id from params
  useEffect(() => {
    dispatch(getPost(id || ''));
  }, [dispatch, id]);

  // grab comments from the database based off post id
  useEffect(() => {
    dispatch(getComments(id || ''));
  }, [id, dispatch]);

  // user joins specific post id and sends it to server
  useEffect(() => {
    socket.emit('join_post', {
      username: username || 'unregistered-user',
      postId: id,
    });
    // clears the comment form on render of page
    dispatch(changeComment(''));
    /* checks if the user closes the browser and
     then disconnects them from the server and any rooms they are in */
    const handleTabClose = () => {
      // e.preventDefault();
      socket.disconnect();
    };
    window.addEventListener('beforeunload', handleTabClose);
    // cleanup so that when the user leaves the page they leave the specific room on unmount
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
      socket.emit('unsubscribe', id);
    };
  }, [id, username, dispatch]);

  // retrieve live comments from the server
  useEffect(() => {
    // to retrieve comments from socket server
    socket.on('receive_comment', (data) => {
      dispatch(changeComments(data));
    });
  }, [dispatch]);

  // retrieve error from socket server
  useEffect(() => {
    socket.on('not_found', (data) => {
      setMessage(data.message);
    });
  }, []);

  const sendComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // to send comments to socket server
    socket.emit('send_comment', {
      username: username || 'unregistered-user',
      comment,
      postId: id,
      date: Date.now(),
      profilepicture: profilepicture || '',
    });
    dispatch(changeComment(''));
  };

  // used to clear notification message
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
    <PostWrapper className="webkit">
      {loading ? <LoadingSpinner /> : <PostDetails post={post} />}
      {commentLoading ? (
        <LoadingSpinner />
      ) : (
        <section>
          <CommentSection comments={comments} />
          <div className="add-comment">
            <section className="form-container">
              <form onSubmit={sendComment}>
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Share your thoughts..."
                  value={comment}
                  onChange={(e) =>
                    // eslint-disable-next-line implicit-arrow-linebreak, prettier/prettier
                    dispatch(changeComment(e.target.value))}
                />
                <button type="submit" disabled={comment === ''}>
                  <i className="fa-solid fa-paper-plane" />
                </button>
              </form>
            </section>
          </div>
        </section>
      )}
      {message && (
        <div className="comment-notification">
          <Notification
            message={message}
            clearMessage={clearMessage}
          />
        </div>
      )}
    </PostWrapper>
  );
}

export default Post;
