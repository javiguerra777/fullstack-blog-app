import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import '../index.css';
import convertUnixToDate from '../utils/functions';
import { CommentsArray, Date } from '../types/types';

type CommentProps = {
  comments: [];
};

const CommentSectionWrapper = styled.section`
  height: 40vh;
  width: 60%;
  margin: auto;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid #000;
  border-top: none;
  .comment {
    width: 60%;
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
          .sort((a: Date, b: Date) => a.date - b.date)
          .map(({ username, comment, date }: CommentsArray) => (
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
