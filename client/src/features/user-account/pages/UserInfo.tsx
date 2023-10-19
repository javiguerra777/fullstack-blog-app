/* eslint-disable no-unused-vars */
import React, {
  useState,
  ChangeEvent,
  useRef,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { BsCardImage } from 'react-icons/bs';
import { useAppDispatch } from '../../../hook';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';
import defaultUserIcon from '../../../assets/img/default_user_image.png';
import { UserInfoWrapper } from '../styles/UserInformation';

const ClickableElement = styled.div``;
function UserInfo() {
  const dispatch = useAppDispatch();
  const inputFile = useRef<HTMLInputElement>(null);
  const { username, image, email } = UseGetStoreUser();
  const handleFileUpload = (e: any) => {
    console.log(e.target.files);
  };
  const onButtonClick = useCallback(() => {
    inputFile.current?.click();
  }, []);
  return (
    <UserInfoWrapper>
      <p className="text-xl mb-3">Account Settings</p>
      <ClickableElement
        onClick={onButtonClick}
        className="relative profile-pic-wrapper cursor-pointer"
      >
        <input
          type="file"
          className="hidden"
          ref={inputFile}
          onChange={handleFileUpload}
        />
        <BsCardImage
          size={40}
          className="icon absolute z-20 bg-black rounded-full p-1 hover:bg-gray-600"
        />
        <img
          src={`${image === 'default' ? defaultUserIcon : image}`}
          alt="profile-pic"
          className="w-full h-full"
        />
      </ClickableElement>
      <div
        // to="/account-info/update"
        className="my-3 cursor-pointer"
      >
        <strong>Update Information</strong>
        <p>@{username}</p>
        <p>{email}</p>
      </div>
      <NavLink to="/account/change-password">
        <strong>Change Password</strong>
      </NavLink>
    </UserInfoWrapper>
  );
}

export default UserInfo;
