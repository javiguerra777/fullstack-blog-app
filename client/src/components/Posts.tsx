import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Post from './Post';

function Posts() {
  const { posts } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  return (
    <section>
      {posts.map((post: any) => (
        <Post
          key={uuidv4()}
          // eslint-disable-next-line no-underscore-dangle
          id={post._id}
          username={post.username}
          title={post.title}
          content={post.body}
          category={post.category}
          date={post.date}
        />
      ))}
    </section>
  );
}

export default Posts;
