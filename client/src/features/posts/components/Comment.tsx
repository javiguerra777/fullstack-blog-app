import React from 'react';
import styled from 'styled-components';
import convertUnixToDate from '../../../utils/functions';
import defaultIcon from '../../../assets/img/default_user_image.png';
import { useDeleteCommentMutation } from '../../../common/api/commentsApi';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';

const CommentWrapper = styled.section`
  background: #444444;
  padding: 10px;
  margin: 10px 0 10px 5px;
  width: 90%;
  @media (min-width: 800px) {
    width: 800px;
  }
`;
type CommentProps = {
  username: string;
  profile_picture: string;
  created_at: string;
  comment: string;
  id: number;
  post_id: number;
};
export default function Comment({
  username,
  profile_picture,
  created_at,
  comment,
  id,
  post_id,
}: CommentProps) {
  const { id: user_id } = UseGetStoreUser();
  const [deleteCommentFromDB] = useDeleteCommentMutation();
  const deleteComment = async () => {
    await deleteCommentFromDB({ id, post_id, user_id }).unwrap();
  };
  return (
    <CommentWrapper>
      <div className="flex flex-row">
        <img
          src={
            profile_picture === 'default'
              ? defaultIcon
              : profile_picture
          }
          alt="user profile icon"
          className="w-20 h-20 rounded"
        />
        <div className="ml-2">
          <p className="font-semibold text-lg">@{username}</p>
          <p>{convertUnixToDate(created_at)}</p>
        </div>
        <button type="button" onClick={deleteComment}>
          Delete
        </button>
      </div>
      <p className="mt-2 text-lg">{comment}</p>
    </CommentWrapper>
  );
}
