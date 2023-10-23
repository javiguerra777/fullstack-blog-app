import React from 'react';
import styled from 'styled-components';
import defaultIcon from '../../../assets/img/default_user_image.png';
import convertUnixToDate from '../../../utils/functions';

const PostDetailsWrapper = styled.section`
  border-top: none;
  background: #444444;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;
type PostDetailsProps = {
  post: {
    username: string;
    body: string;
    image: string;
    profile_picture: string;
    created_at: string;
    title: string;
  };
};
function PostDetails({ post }: PostDetailsProps) {
  const {
    username,
    body,
    image,
    profile_picture,
    created_at,
    title,
  } = post;
  return (
    <PostDetailsWrapper>
      <div className="flex flex-row w-full">
        <img
          src={
            profile_picture === 'default'
              ? defaultIcon
              : profile_picture
          }
          alt="user-icon"
          className="h-20 w-20 rounded"
        />
        <div className="ml-2">
          <p className="username text-lg font-semibold">
            @{username || 'Username'}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Posted on: </span>
            {convertUnixToDate(created_at)}
          </p>
        </div>
      </div>
      <p className="w-full text-2xl mt-4">{title}</p>
      {image && <img src={image} className="post-image" alt="img" />}
      <p className="w-full mt-2 text-lg">{body}</p>
    </PostDetailsWrapper>
  );
}

export default PostDetails;
