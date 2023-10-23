import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import convertUnixToDate from '../../../utils/functions';
import { CommentModel } from '../../../common/models/comment';
import defaultIcon from '../../../assets/img/default_user_image.png';

type CommentProps = {
  comments: [];
};

const CommentWrapper = styled.section`
  background: #444444;
  padding: 10px;
  margin: 10px 0;
  max-width: 800px;
`;
function CommentSection({ comments }: CommentProps) {
  return (
    <section className="pb-20">
      {comments.length > 0 &&
        comments.map(
          ({
            username,
            comment,
            created_at,
            profile_picture,
          }: CommentModel) => (
            <CommentWrapper key={uuidv4()} className="comment">
              <img
                src={
                  profile_picture === 'default'
                    ? defaultIcon
                    : profile_picture
                }
                alt="user profile icon"
                className="w-20 h-20 rounded"
              />
              <h1>@{username}:</h1>
              <p>{comment} - </p>
              <small>{convertUnixToDate(created_at)}</small>
            </CommentWrapper>
          ),
        )}
    </section>
  );
}

export default CommentSection;
