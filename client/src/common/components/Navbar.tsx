/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import icon from '../../assets/img/plane.png';
import { StyledNavBar } from '../styles/StyledNavBar';
import Drawer from './Drawer';
import UseGetStoreUser from '../hooks/UseGetStoreUser';

function Navbar() {
  const { loggedIn } = UseGetStoreUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);
  return (
    <>
      <StyledNavBar>
        <NavLink
          to="/"
          className="flex flex-row hover:underline text-red-600"
        >
          <p className="mx-2 ml-4 text-3xl text-red-600">Socialize</p>
          <img
            src={icon}
            className="h-10 w-10"
            alt="logo of a paper airplane"
          />
        </NavLink>

        <div className="pr-4">
          {/* {loggedIn && (
            <div className="profile-info">
              <p>
                Welcome, <span> </span> {username}
              </p>
              <div
                className={isOpen ? 'open' : 'closed'}
                onMouseLeave={() => setIsOpen(false)}
              >
                <NavLink to="/userInfo" className="user-profile">
                  View/Edit Profile
                </NavLink>
              </div>
              <img
                src={image || defautUserIcon}
                className="userIcon"
                alt="generic user icon"
                onMouseEnter={() => setIsOpen(true)}
              />
            </div>
          )} */}
          {loggedIn ? (
            // <button
            //   type="button"
            //   className="signout"
            //   onClick={buttonSignOut}
            // >
            //   Sign out
            // </button>
            <button
              className="bg-white w-10 h-10 text-black rounded-full flex items-center justify-center"
              type="button"
              onClick={() => setDrawerOpen(true)}
            >
              <GiHamburgerMenu size={20} />
            </button>
          ) : (
            <NavLink
              to="/register"
              className="bg-blue-500 p-2 rounded-lg"
            >
              Sign in
            </NavLink>
          )}
        </div>
      </StyledNavBar>
      <Drawer isOpen={drawerOpen} closeDrawer={closeDrawer} />
    </>
  );
}

export default Navbar;
