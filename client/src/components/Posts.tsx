import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function Posts() {
  const { posts } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  return (
    <div>
      {posts.map((post: any) => (
        <div key={uuidv4()}>
          <h1>{post.username}</h1>
          <p>{post.date}</p>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>{post.category}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;
