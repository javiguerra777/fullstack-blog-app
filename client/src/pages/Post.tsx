import React, { useEffect, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import axios from 'axios';
import { getPost } from '../store/PostSlice';

const PostWrapper = styled.section`
  .form-container {
    position: fixed;
    bottom: 0;
    width: 100%;
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
  const { post } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  // grab post by id from params
  useEffect(() => {
    dispatch<any>(getPost(id!));
  }, [dispatch, id]);

  // grab comments from the database based off post id
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/comments/${id}`)
      .then((response: any) => setComments(response.data));
  }, [id]);
  // user joins specific post id and sends it to server
  useEffect(() => {
    socket.emit('join_post', {
      username: username || 'unregistered-user',
      postId: id,
    });
    return () => {
      socket.emit('unsubscribe', id);
    };
  }, []);

  // retrieve live comments from the server
  useEffect(() => {
    // to retrieve comments from socket server
    socket.on('receive_comment', (data: any) => {
      setComments(data);
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
    });
    setComment('');
  };
  return (
    <PostWrapper>
      <section>
        <h1>{post.username}</h1>
        <p>{post.body}</p>
      </section>
      <section>
        {/* eslint-disable-next-line operator-linebreak */}
        {comments.length > 0 &&
          comments.map((com: any) => (
            <div key={uuidv4()}>
              <h1>{com.username}</h1>
              <p>{com.comment}</p>
            </div>
          ))}
      </section>
      <section className="form-container">
        <form onSubmit={sendComment}>
          <input
            type="text"
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Comment</button>
        </form>
      </section>
    </PostWrapper>
  );
}

export default Post;
