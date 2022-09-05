/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { RootState, AppDispatch } from '../store';
import Post from '../components/Post';
import {
  getFriendsPosts,
  getFriendsInfo,
} from '../store/ProfileSlice';
import { Date, PostType } from '../types/types';
import ProfileWrapper from '../styles/ProfileStyles';
import defaultImg from '../img/default_user_image.png';

function UsersProfile() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { username, userId, image } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const { usersPosts } = useSelector(
    (state: RootState) => state.usersProfile,
    shallowEqual,
  );
  const postsForSort = [...usersPosts];
  useEffect(() => {
    dispatch(
      getFriendsInfo({ username: username || '', token: userId }),
    );
    dispatch(
      getFriendsPosts({ username: username || '', token: userId }),
    );
  }, [dispatch, username, userId]);

  const navToEditProfile = () => {
    navigate('/userInfo');
  };
  return (
    <ProfileWrapper>
      <header className="users-info header-wrapper">
        <section className="img-username">
          <img src={image || defaultImg} alt="user-img" />
          <p>@{username}</p>
        </section>
        <section className="edit-profile">
          <button onClick={navToEditProfile} type="button">
            Edit Profile
          </button>
        </section>
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

export default UsersProfile;
