import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getPost } from '../store/PostSlice';

function Post() {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  useEffect(() => {
    dispatch<any>(getPost(id));
  }, [dispatch]);
  console.log(post);
  return <div>Post</div>;
}

export default Post;
