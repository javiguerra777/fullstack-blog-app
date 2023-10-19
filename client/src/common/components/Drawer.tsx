import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import UseGetStoreUser from '../hooks/UseGetStoreUser';
import { useAppDispatch } from '../../hook';
import { signOut } from '../../store/UserSlice';
import defaultImage from '../../assets/img/default_user_image.png';

const Wrapper = styled.section``;
type DrawerProps = {
  isOpen: boolean;
  closeDrawer: () => void;
};
export default function Drawer({ isOpen, closeDrawer }: DrawerProps) {
  const dispatch = useAppDispatch();
  const { username, image } = UseGetStoreUser();
  const signUserOut = () => {
    closeDrawer();
    dispatch(signOut());
  };
  return (
    <div
      className={`fixed top-0 right-0 h-screen w-screen bg-gray-900 bg-opacity-25 overflow-hidden z-40 inset-0 transform ease-in-out ${
        isOpen
          ? 'transition-opacity opacity-100 duration-500 translate-x-0'
          : 'transition-all delay-500 opacity-0 translate-x-full'
      }`}
    >
      <Wrapper
        className="cursor-pointer h-full w-full absolute"
        onClick={closeDrawer}
      />
      <div
        className={`h-full w-60 right-0 absolute z-60 bg-white text-black flex flex-col items-center shadow-xl delay-400 duration-500 ease-in-out transition-all transform rounded-l-lg ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-row justify-center relative items-center w-full mt-2">
          <p className="font-semibold text-lg">Welcome Back</p>
          <button
            type="button"
            className="absolute p-2 right-3 hover:bg-red-600 hover:text-white"
            onClick={closeDrawer}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="w-full flex flex-col ml-10">
          <img
            src={`${image === 'default' ? defaultImage : image}`}
            alt="profile-pic"
            className="w-20 h-20 rounded-full"
          />
          <p className="font-semibold text-lg">@{username}</p>
          <NavLink
            to="/"
            className="hover:underline"
            onClick={closeDrawer}
          >
            Home
          </NavLink>
          <NavLink
            to="/userInfo"
            className="hover:underline"
            onClick={closeDrawer}
          >
            View/Edit Profile
          </NavLink>
        </div>
        <button
          type="button"
          className="bg-red-600 w-40 mt-3 rounded py-2 text-white hover:bg-red-400"
          onClick={signUserOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
