/* eslint-disable prettier/prettier */
import React, {
  useState, ChangeEvent, FormEvent,
} from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  updateUsername, updatePassword, updateProfilePicture, updateEmail,
} from '../store/UserSlice';
import { RootState } from '../store';

const UserInfoWrapper = styled.main`
  height: 92vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .prev-img {
    height: 50px;
    width: 50px;
  }
  .profile-img {
    align-self: center;
    width: 50%;
    height: 50vh;
  }
  .update-form {
    display: flex;
    flex-direction: column;
    button {
      margin-left: 2em;
      width: 15em;
    }
  .update-info {
    display: flex;
    flex-direction: column;
    p {
      margin-left: 1em;
    }
    input {
    width: 30em;
    margin-left: 2em;
    }
  }
`;
function UserInfo() {
  const dispatch = useDispatch();
  const {
    username, image, userId, id, email,
  } = useSelector((state: RootState) => state.user, shallowEqual);
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
    const userNameRequest = {
      userId,
      body: {
        id,
        username,
        newusername: newUserName.toLowerCase(),
      },
    };
    const response = await dispatch<any>(updateUsername(userNameRequest));
    if (response.error) {
      return;
    }
    setNewUserName('');
  };
  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordRequest = {
      userId,
      body: {
        id,
        password: newPassword,
      },
    };
    const request = await dispatch<any>(updatePassword(passwordRequest));
    if (request.error) {
      return;
    }
    setNewPassword('');
  };
  const changeProfilePicture = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pictureRequest = {
      userId,
      body: {
        image: newProfilePicture,
        id,
        username,
      },
    };
    const response = await dispatch<any>(updateProfilePicture(pictureRequest));
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
      userId,
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
      {/* Update email form */}
      <form onSubmit={changeEmail} className="update-form">
        <label htmlFor="email" className="update-info">
          <p>
            Current Email:
            {' '}
            {email}
          </p>
          <input type="email" placeholder="example@gmail.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <button type="submit" disabled={newEmail === ''}> Change Email</button>
        </label>
      </form>
      {/* Update username form */}
      <form onSubmit={changeUsername} className="update-form">
        <label htmlFor="username" className="update-info">
          <p>
            Current Username:
            {' '}
            {username}
          </p>
          <input type="text" placeholder="New Username" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
        </label>
        <button type="submit" disabled={newUserName === ''}>Change Username</button>
      </form>
      <form onSubmit={changePassword} className="update-form">
        {/* Update password form */}
        <label htmlFor="password" className="update-info">
          <p>Enter New Password</p>
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <button type="submit" disabled={newPassword === ''}>Change Password</button>
      </form>
      {/* Update profile picture form */}
      <form onSubmit={changeProfilePicture} className="update-form">
        <label htmlFor="profilePicture" className="update-info">
          <p>Current Profile Picture</p>
          <img className="profile-img" src={image} alt="user profile pic" />
          <p>Upload New Profile Picture</p>
          <input type="file" onChange={handleImageChange} />
        </label>
        {previewPicture && <img className="prev-img" src={previewPicture} alt="prev-img" />}
        <button type="submit" disabled={disabled}> Change Profile Picture</button>
      </form>
    </UserInfoWrapper>
  );
}

export default UserInfo;
