/* eslint-disable no-unused-vars */
import React, { useEffect, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetails from '../components/PostDetails';
import CommentSection from '../components/CommentSection';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import { PostWrapper } from '../styles/CommentStyle';
import { useGetPostQuery } from '../../../common/api/postsApi';
import CommentForm from '../components/CommentForm';
import { useGetCommentsByPostIdQuery } from '../../../common/api/commentsApi';

export default function CommentPage() {
  const { id } = useParams<string>();
  const { data, isLoading } = useGetPostQuery({ id });
  const { data: comments, isLoading: commentsLoading } =
    useGetCommentsByPostIdQuery({ id });
  return (
    <PostWrapper>
      {isLoading ? <LoadingSpinner /> : <PostDetails post={data} />}
      <p className="text-3xl font-semibold mt-2 ml-2">Comments</p>
      {commentsLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <CommentSection comments={comments} />
          <CommentForm post_id={parseFloat(id || '')} />
        </>
      )}
    </PostWrapper>
  );
}
