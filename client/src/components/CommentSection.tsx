import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import '../index.css';

type CommentProps = {
  comments: [];
};

const CommentSectionWrapper = styled.section`
  height: 50vh;
  width: 100vw;
  max-height: auto;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 3em;
  .comment {
    margin-left: 1.5em;
    border: 1px solid #000;
  }
`;
function CommentSection({ comments }: CommentProps) {
  return (
    <CommentSectionWrapper className="webkit">
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
