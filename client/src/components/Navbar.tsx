import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { signOut } from '../store/UserSlice';
import icon from '../img/telegram.png';
import { RootState } from '../store';

const StyledNavbar = styled.nav`
  width: 100%;
  height: 10vh;
  background: #e2dcc8;
  color: #0f3d3e;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }
  a {
    font-size: 1.5rem;
    text-decoration: none;
    color: #0f3d3e;
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4rem;
    &.logo {
      font-size: 1.5rem;
    }
  }
  & img {
    width: 25px;
    height: 25px;
    margin: 0 1rem;
  }
`;

function Navbar() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const buttonSignOut = () => {
    dispatch(signOut());
  };
  return (
    <StyledNavbar>
      <div className="logo">
        <p>Socialize</p>
        <NavLink to="/">
          <img src={icon} alt="logo of a paper airplane" />
        </NavLink>
      </div>
      <div>
        {loggedIn ? (
          <button type="button" onClick={buttonSignOut}>
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
