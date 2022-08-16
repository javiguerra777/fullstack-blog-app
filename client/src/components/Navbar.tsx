import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { signOut } from '../store/UserSlice';
import { RootState } from '../store';
import icon from '../img/plane.png';

const StyledNavbar = styled.nav`
  width: 100%;
  height: 8vh;
  background: none;
  color: #ededed;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: white;
  }
  .signout {
    font-size: 1.5rem;
    text-decoration: none;
    color: #da0037;
  }
  a {
    font-size: 1.5rem;
    text-decoration: none;
    color: #da0037;
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4rem;
    &.logo {
      font-size: 3rem;
      color: #da0037;
      & img {
        width: 45px;
        height: 45px;
        margin-top: 15px;
      }
    }
  }
  & img {
    width: 25px;
    height: 25px;
    margin: 0 1rem;
  }
  @media (max-width: 800px) {
    height: 8vh;
    max-height: 8vh;
    font-weight: 400;
    div {
      padding: 0;
    }
  }
`;

function Navbar() {
  const dispatch = useDispatch();
  const { loggedIn, username, image } = useSelector(
    (state: RootState) => state.user,

    shallowEqual,
  );
  const buttonSignOut = () => {
    dispatch(signOut());
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log(isOpen);
  return (
    <StyledNavbar>
      <div className="logo">
        <p>Socialize</p>
        <NavLink to="/">
          <img src={icon} alt="logo of a paper airplane" />
        </NavLink>
      </div>

      <div>
        {loggedIn && (
          <>
            <p>
              Welcome,
              {username}
            </p>
            <div className="user-menu">
              <button type="button">View Profile</button>
              <button type="button">Edit Profile</button>
              <button type="button">Close</button>
            </div>
            <NavLink to="/userInfo">
              <img
                src={image}
                className="userIcon"
                alt="generic user icon"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              />
            </NavLink>
          </>
        )}
        {loggedIn ? (
          <button
            type="button"
            className="signout"
            onClick={buttonSignOut}
          >
            Sign out
          </button>
        ) : (
          <NavLink to="/signin">Sign in</NavLink>
        )}
      </div>
    </StyledNavbar>
  );
}

export default Navbar;
