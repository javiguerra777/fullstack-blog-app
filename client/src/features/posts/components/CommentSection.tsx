import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CommentModel } from '../../../common/models/comment';
import Comment from './Comment';

type CommentProps = {
  comments: [];
  post_id: number;
};

function CommentSection({ comments, post_id }: CommentProps) {
  return (
    <section className="pb-20">
      {comments.length > 0 &&
        comments.map(
          ({
            username,
            comment,
            created_at,
            profile_picture,
            id,
          }: CommentModel) => (
            <Comment
              key={uuidv4()}
              username={username}
              comment={comment}
              created_at={created_at}
              profile_picture={profile_picture}
              id={id}
              post_id={post_id}
            />
          ),
        )}
    </section>
  );
}

export default CommentSection;
