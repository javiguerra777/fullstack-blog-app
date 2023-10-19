import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import UseGetStoreUser from '../hooks/UseGetStoreUser';
import { useAppDispatch } from '../../hook';
import { signOut } from '../../store/UserSlice';

const Wrapper = styled.section``;
type DrawerProps = {
  isOpen: boolean;
  setDrawerOpen: any;
};
export default function Drawer({
  isOpen,
  setDrawerOpen,
}: DrawerProps) {
  const dispatch = useAppDispatch();
  const { username } = UseGetStoreUser();
  const signUserOut = () => {
    setDrawerOpen(false);
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
        onClick={() => setDrawerOpen(false)}
      />
      <div
        className={`h-full w-60 right-0 absolute z-60 bg-white text-black flex flex-col shadow-xl delay-400 duration-500 ease-in-out transition-all transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-row justify-between">
          <p>Welcome Back @{username}</p>
          <button type="button" onClick={() => setDrawerOpen(false)}>
            <AiOutlineClose />
          </button>
        </div>
        <button type="button" onClick={signUserOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
