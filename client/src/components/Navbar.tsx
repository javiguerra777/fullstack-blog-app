import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import icon from '../img/telegram.png';

const StyledNavbar = styled.nav`
  width: 100%;
  height: 65px;
  background: #e2dcc8;
  color: #0f3d3e;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  return (
    <StyledNavbar>
      <div className="logo">
        <p>Socialize</p>
        <NavLink to="/">
          <img src={icon} alt="logo of a paper airplane" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/signin">Sign in</NavLink>
      </div>
    </StyledNavbar>
  );
}

export default Navbar;
