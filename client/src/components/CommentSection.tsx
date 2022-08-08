import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import '../index.css';
import convertUnixToDate from '../utils/functions';

type CommentProps = {
  comments: [];
};

const CommentSectionWrapper = styled.section`
  max-height: auto;
  .comment {
    margin-left: 1.5em;
  }
`;
function CommentSection({ comments }: CommentProps) {
  // to fix issue with sorting comments array
  const commentsToSort = [...comments];
  return (
    <CommentSectionWrapper className="webkit">
      {/* eslint-disable-next-line operator-linebreak */}
      {commentsToSort.length > 0 &&
        commentsToSort
          .sort((a: any, b: any) => a.date - b.date)
          .map(({ username, comment, date }: any) => (
            <div key={uuidv4()} className="comment">
              <h1>{username}</h1>
              <p>{comment}</p>
              <p>{convertUnixToDate(date)}</p>
            </div>
          ))}
    </CommentSectionWrapper>
  );
}

export default CommentSection;
