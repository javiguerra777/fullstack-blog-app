/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  getFriendsInfo,
  getFriendsPosts,
} from '../store/ProfileSlice';
import { AppDispatch, RootState } from '../store';
import Post from '../components/Post';
import { PostType, Date } from '../types/types';
import defaultImg from '../img/default_user_image.png';
import ProfileWrapper from '../styles/ProfileStyles';

function Profile() {
  const { username } = useParams<string>();
  const { userId } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const { usersPosts, usersProfilePicture, otherUserName } =
    useSelector(
      (state: RootState) => state.usersProfile,
      shallowEqual,
    );
  const postsForSort = [...usersPosts];
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getFriendsInfo({
        token: userId,
        username: username || '',
      }),
    );
    dispatch(
      getFriendsPosts({ token: userId, username: username || '' }),
    );
  }, [dispatch, userId, username]);
  return (
    <ProfileWrapper>
      <header className="users-info">
        <img src={usersProfilePicture || defaultImg} alt="user-img" />
        <p>@{otherUserName}</p>
      </header>
      <section className="posts">
        {postsForSort.length > 0 &&
          postsForSort
            .sort((a: Date, b: Date) => b.date - a.date)
            .map((post: PostType) => (
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
                comments={post.comments || []}
                profilepicture={post.profilepicture}
              />
            ))}
      </section>
    </ProfileWrapper>
  );
}

export default Profile;
