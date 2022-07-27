import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled.button`
  height: 50px;
  width: 50px;
  background: none;
  border: none;
  position: fixed;
  bottom: 5%;
  right: 5%;
  font-size: 2rem;
  cursor: pointer;
  & a {
    color: #000;
  }
`;
function NewPostBtn() {
  return (
    <StyledButton type="button">
      <Link to="/newPost">
        <i className="fa-solid fa-pen-to-square" />
      </Link>
    </StyledButton>
  );
}

export default NewPostBtn;
