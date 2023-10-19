import styled from 'styled-components';

export const StyledNavBar = styled.nav`
  width: 100%;
  height: 8vh;
  background: none;
  color: #ededed;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    .logo {
      & p {
        font-size: 2rem;
        margin-left: 1rem;
      }
    }
    & div {
      & .user-profile {
        font-size: 1rem;
        margin: 0 2rem;
      }
    }
    }
    & a {
      font-size: 1rem;
      margin-right: 1rem;
    }
  }
  @media (max-size: 920px) {
    & div {
      & button {
        font-size: 0.75rem;
      }
    }
    
  }
`;
export default {};
