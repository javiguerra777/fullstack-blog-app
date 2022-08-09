import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import '../index.css';
import convertUnixToDate from '../utils/functions';

type CommentProps = {
  comments: [];
};

// const randomNum = () => {
//   const num = Math.floor(Math.random() * 2);
// };

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
  max-height: auto;
  .comment {
    margin-left: 1.5em;
    border: 1px solid #000;
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
