import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import io, { Socket } from 'socket.io-client';
import { getPost } from '../store/PostSlice';

// const socket = io.connect('http://localhost:5500');

function Post() {
  const { id } = useParams<string>();
  const dispatch = useDispatch();
  const { post } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  useEffect(() => {
    dispatch<any>(getPost(id!));
  }, [dispatch]);
  // useEffect(() => {
  //   socket.on('receive_comment', (data: any) => {
  //     console.log(data);
  //   });
  // }, []);
  return (
    <div>
      <section>
        <h1>{post.username}</h1>
        <p>{post.body}</p>
      </section>
      <section>
        <form>
          <input type="text" name="comment" id="comment" />
          <button type="submit">Comment</button>
        </form>
      </section>
    </div>
  );
}

export default Post;
