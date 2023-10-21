/* eslint-disable no-unused-vars */
import React, { useEffect, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import PostDetails from '../components/PostDetails';
import CommentSection from '../components/CommentSection';
import {
  getComments,
  changeComment,
} from '../../../store/CommentSlice';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import { PostWrapper } from '../styles/CommentStyle';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';
import { useGetPostQuery } from '../../../common/api/postsApi';
import CommentForm from '../components/CommentForm';

export default function CommentPage() {
  const { id } = useParams<string>();
  const { data, isLoading } = useGetPostQuery({ id });
  const dispatch: AppDispatch = useDispatch();
  const {
    username,
    image: profilepicture,
    id: userId,
  } = UseGetStoreUser();
  const {
    comment,
    comments,
    loading: commentLoading,
  } = useSelector((state: RootState) => state.comment, shallowEqual);

  // grab comments from the database based off post id
  useEffect(() => {
    dispatch(getComments(id || ''));
  }, [id, dispatch]);

  return (
    <PostWrapper>
      {isLoading ? <LoadingSpinner /> : <PostDetails post={data} />}
      <p className="text-3xl font-semibold mt-2 ml-2">Comments</p>
      {commentLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* <CommentSection comments={comments} /> */}
          <CommentForm />
        </>
      )}
    </PostWrapper>
  );
}
