import React, { useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import PostDetails from '../components/PostDetails';
import CommentSection from '../components/CommentSection';
import { getPost } from '../store/PostSlice';
import {
  getComments,
  changeComment,
  changeComments,
} from '../store/CommentSlice';
import LoadingSpinner from '../styles/LoadingSpinner';

const PostWrapper = styled.section`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form-container {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  img {
    height: 50px;
    width: 50px;
  }
`;

// create connection with socket.io server
const socket = io('http://localhost:5500');

function Post() {
  const { id } = useParams<string>();
  const dispatch = useDispatch();
  const { username } = useSelector(
    (state: any) => state.user,
    shallowEqual,
  );
  const { post, loading } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  const { comment, comments } = useSelector(
    (state: any) => state.comment,
    shallowEqual,
  );
  const commentLoading = useSelector(
    (state: any) => state.comment.loading,
    shallowEqual,
  );

  // grab post by id from params
  useEffect(() => {
    dispatch<any>(getPost(id || ''));
  }, [dispatch, id]);

  // grab comments from the database based off post id
  useEffect(() => {
    dispatch<any>(getComments(id || ''));
  }, [id, dispatch]);

  // user joins specific post id and sends it to server
  useEffect(() => {
    socket.emit('join_post', {
      username: username || 'unregistered-user',
      postId: id,
    });
    // cleanup so that when the user leaves the page they leave the specific room on unmount
    return () => {
      socket.emit('unsubscribe', id);
    };
  }, [id, username]);

  // retrieve live comments from the server
  useEffect(() => {
    // to retrieve comments from socket server
    socket.on('receive_comment', (data) => {
      dispatch(changeComments(data));
    });
  }, [dispatch]);

  const sendComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // to send comments to socket server
    socket.emit('send_comment', {
      username: username || 'unregistered-user',
      comment,
      postId: id,
      date: Date.now(),
    });
    dispatch(changeComment(''));
  };
  return (
    <PostWrapper>
      {loading ? <LoadingSpinner /> : <PostDetails post={post} />}
      {commentLoading ? (
        <LoadingSpinner />
      ) : (
        <section>
          <CommentSection comments={comments} />
          <section className="form-container">
            <form onSubmit={sendComment}>
              <input
                type="text"
                name="comment"
                id="comment"
                value={comment}
                onChange={(e) =>
                  // eslint-disable-next-line implicit-arrow-linebreak, prettier/prettier
                  dispatch(changeComment(e.target.value))}
              />
              <button type="submit">Comment</button>
            </form>
          </section>
        </section>
      )}
    </PostWrapper>
  );
}

export default Post;
