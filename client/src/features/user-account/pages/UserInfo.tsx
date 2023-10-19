/* eslint-disable no-unused-vars */
import React, {
  useState,
  ChangeEvent,
  useRef,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsCardImage, BsChevronDoubleRight } from 'react-icons/bs';
import { useAppDispatch } from '../../../hook';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';
import defaultUserIcon from '../../../assets/img/default_user_image.png';
import { UserInfoWrapper } from '../styles/UserInformation';

const ClickableElement = styled.div``;
function UserInfo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputFile = useRef<HTMLInputElement>(null);
  const { username, image, email } = UseGetStoreUser();
  const handleFileUpload = (e: ChangeEvent) => {
    const { files } = e.target as HTMLInputElement;
    if (files) {
      console.log(files[0]);
      console.log('this is where the async thunk will go');
    }
  };
  const onButtonClick = useCallback(() => {
    inputFile.current?.click();
  }, []);
  const navToInformation = useCallback(() => {
    navigate('/account-info/update-information');
  }, [navigate]);
  return (
    <UserInfoWrapper>
      <div>
        <p className="text-xl mb-6 text-center">Account Settings</p>
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
            className="w-full h-full profile-pic"
          />
        </ClickableElement>
        <ClickableElement
          onClick={navToInformation}
          className="my-3 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
        >
          <strong className="flex items-center">
            Update Information <BsChevronDoubleRight />
          </strong>
          <p>@{username}</p>
          <p>{email}</p>
        </ClickableElement>
        <NavLink
          to="/account-info/change-password"
          className="hover:underline"
        >
          <strong className="flex items-center">
            Change Password <BsChevronDoubleRight />
          </strong>
        </NavLink>
      </div>
    </UserInfoWrapper>
  );
}

export default UserInfo;
