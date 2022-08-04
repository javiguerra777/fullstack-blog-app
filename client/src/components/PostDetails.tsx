import React from 'react';

type PostProps = {
  post: {
    username: string;
    body: string;
    image: string;
  };
};

function PostDetails({ post }: PostProps) {
  const { username, body, image } = post;
  return (
    <section>
      <h1>{username}</h1>
      <p>{body}</p>
      {image && <img src={image} alt="img" />}
    </section>
  );
}

export default PostDetails;
