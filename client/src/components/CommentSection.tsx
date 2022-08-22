/* eslint-disable react/jsx-one-expression-per-line */
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
  height: 22vh;
  width: 50%;
  background: #444444;
  margin: 0 auto;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .comment {
    width: 60%;
    height: 25px;
    display: flex;
    align-items: center;
    margin-left: 1rem;
    & h1 {
      font-weight: 500;
    }
    & p {
      margin: 0.5rem;
      font-weight: 300;
    }
    & small {
      font-size: 0.75rem;
      opacity: 70%;
    }
  }
  @media (max-width: 576px) {
    width: 95%;
    font-size: 0.75rem;
    & .comment {
      width: 95%;
    }
  }
  @media (max-width: 768px) {
    width: 90%;
    font-size: 0.85rem;
    & .comment {
      width: 95%;
    }
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
              <h1> {username}:</h1>
              <p>{comment} - </p>
              <small>{convertUnixToDate(date)}</small>
            </div>
          ))}
    </CommentSectionWrapper>
  );
}

export default CommentSection;
