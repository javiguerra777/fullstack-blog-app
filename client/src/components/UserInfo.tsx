import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../hook';
import {
  updateProfilePicture,
  updateEmail,
} from '../store/UserSlice';
import UseGetStoreUser from '../common/hooks/UseGetStoreUser';
import defaultUserIcon from '../assets/img/user.png';

const UserInfoWrapper = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
     margin: 1rem;
      font-size: 1.25rem;
      background: #0f3d3e;
      color: #e2dcc8;
      border-radius: 5px;
      border: none;
      cursor: pointer;
    }
    & button:disabled {
      background: black;
      cursor: default;
    }
  }
  .prev-img {
    height: 200px;
    width: 200px;
  }
  .profile-img {
    align-self: center;
    width: 200px;
    height: 200px;
  }
  .update-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: .5rem;
    button {
      width: 15em;
      cursor: pointer
    }
  .update-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin-left: 1em;
    }
    input {
    width: 400px;
    height: 25px;
    margin: 0.5rem;
    text-align: center;
    border: none;
    &.image-input {
      margin-left: 200px;
    }
    }
  }
  .image-input {
    border: none;
  }
`;
function UserInfo() {
  const dispatch = useAppDispatch();
  const { username, image, id, token, email } = UseGetStoreUser();
  const [newUserName, setNewUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState({});
  const [newEmail, setNewEmail] = useState('');
  const [previewPicture, setPreviewPicture] = useState('');
  const [disabled, setDisabled] = useState(true);
  // allows user to change files which updates profile picture state
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPreviewPicture('');
      setDisabled(true);
      return;
    }
    setNewProfilePicture(e.target.files[0]);
    setPreviewPicture(URL.createObjectURL(e.target.files[0]));
    setDisabled(false);
  };
  const changeUsername = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const changeProfilePicture = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const pictureRequest = {
      token,
      body: {
        image: newProfilePicture,
        id,
        username,
      },
    };
    const response = await dispatch<any>(
      updateProfilePicture(pictureRequest),
    );
    if (response.error) {
      return;
    }
    setNewProfilePicture({});
    setPreviewPicture('');
    setDisabled(true);
  };
  const changeEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRequest = {
      token,
      body: {
        email: newEmail,
        id,
      },
    };
    const response = await dispatch<any>(updateEmail(emailRequest));
    if (response.error) {
      return;
    }
    setNewEmail('');
  };

  return (
    <UserInfoWrapper>
      {/* Update profile picture form */}
      <form onSubmit={changeProfilePicture} className="update-form">
        <label htmlFor="profilePicture" className="update-info">
          <p>Current Profile Picture</p>
          <img
            className="profile-img"
            src={image || defaultUserIcon}
            alt="user profile pic"
          />
          <p>Upload New Profile Picture</p>
          <input
            type="file"
            className="image-input"
            onChange={handleImageChange}
          />
        </label>
        {previewPicture && (
          <img
            className="prev-img"
            src={previewPicture}
            alt="prev-img"
          />
        )}
        <button type="submit" disabled={disabled}>
          {' '}
          Change Profile Picture
        </button>
      </form>
      {/* Update email form */}
      <form onSubmit={changeEmail} className="update-form">
        <label htmlFor="email" className="update-info">
          <p>Current Email: {email}</p>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button type="submit" disabled={newEmail === ''}>
            {' '}
            Change Email
          </button>
        </label>
      </form>
      {/* Update username form */}
      <form onSubmit={changeUsername} className="update-form">
        <label htmlFor="username" className="update-info">
          <p>Current Username: {username}</p>
          <input
            type="text"
            placeholder="New Username"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
        </label>
        <button type="submit" disabled={newUserName === ''}>
          Change Username
        </button>
      </form>
      <form onSubmit={changePassword} className="update-form">
        {/* Update password form */}
        <label htmlFor="password" className="update-info">
          <p>Enter New Password</p>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={newPassword === ''}>
          Change Password
        </button>
      </form>
    </UserInfoWrapper>
  );
}

export default UserInfo;
