/* eslint-disable prettier/prettier */
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import Post from './Post';
// import { getComments } from '../store/CommentSlice';

const PostsWrapper = styled.section`
  width: 100%;
  margin-left: 3vw;
  overflow-y: scroll;
  padding-bottom: 10vh;
`;
type PostsType = {
  body: string;
  category: string;
  date: number;
  title: string;
  username: string;
  __v: number;
  _id: string;
  image?: string;
  likes?: [];
};

function Posts() {
  // const dispatch = useDispatch();
  const { posts } = useSelector(
    (state: any) => state.post,
    shallowEqual,
  );
  const { comments } = useSelector(
    (state: any) => state.comment,
    shallowEqual,
  );
  console.log(comments);

  // useEffect(() => {
  //   posts.forEach((post: any) => {
  //     // eslint-disable-next-line no-underscore-dangle
  //     dispatch(getComments(post._id));
  //   });
  // }, [dispatch, posts]);

  // fixing bug with array sort method
  const postsForSort = [...posts];
  return (
    <PostsWrapper>
      {postsForSort.length > 0
        && postsForSort
          .sort((a: PostsType, b: PostsType) => (b.date - a.date))
          .map((post: PostsType) => (
            <Post
              key={uuidv4()}
              // eslint-disable-next-line no-underscore-dangle
              id={post._id}
              username={post.username}
              title={post.title}
              content={post.body}
              category={post.category}
              date={post.date}
              image={post.image || ''}
              likes={post.likes || []}
            />
          ))}
    </PostsWrapper>
  );
}

export default Posts;
