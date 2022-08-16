/* eslint-disable prettier/prettier */
import React, {
  useState, ChangeEvent, FormEvent,
} from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';

const UserInfoWrapper = styled.main`
  height: 92vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
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
  const { username, image } = useSelector((state: RootState) => state.user, shallowEqual);
  const [newUserName, setNewUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState({});
  const [disabled, setDisabled] = useState(true);
  // allows user to change files which updates profile picture state
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setNewProfilePicture(e.target!.files![0]);
    setDisabled(false);
  };
  const changeUsername = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewUserName('');
  };
  const changePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewPassword('');
  };
  const changeProfilePicture = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newProfilePicture);
    setNewProfilePicture({});
    setDisabled(true);
  };
  return (
    <UserInfoWrapper>
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
        <button type="submit" disabled={disabled}> Change Profile Picture</button>
      </form>
    </UserInfoWrapper>
  );
}

export default UserInfo;
