import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

type CommentProps = {
  comments: [];
};

const CommentSectionWrapper = styled.section`
  height: 65vh;
  width: 100vw;
  overflow-y: scroll;
  .comment {
    margin-left: 1.5em;
  }
`;
function CommentSection({ comments }: CommentProps) {
  return (
    <CommentSectionWrapper>
      {/* eslint-disable-next-line operator-linebreak */}
      {comments.length > 0 &&
        comments.map(({ username, comment }: any) => (
          <div key={uuidv4()} className="comment">
            <h1>{username}</h1>
            <p>{comment}</p>
          </div>
        ))}
    </CommentSectionWrapper>
  );
}

export default CommentSection;
