import React from 'react';
import { v4 as uuidv4 } from 'uuid';

type CommentProps = {
  comments: [];
};

function CommentSection({ comments }: CommentProps) {
  return (
    <section>
      {/* eslint-disable-next-line operator-linebreak */}
      {comments.length > 0 &&
        comments.map(({ username, comment }: any) => (
          <div key={uuidv4()}>
            <h1>{username}</h1>
            <p>{comment}</p>
          </div>
        ))}
    </section>
  );
}

export default CommentSection;
