import styled from 'styled-components';

const ProfileWrapper = styled.main`
  width: 100vw;
  .users-info {
    margin-left: 1em;
    img {
      width: 100px;
      height: 100px;
      border-radius: 5em;
    }
  }
  .posts {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .edit-profile {
      margin-right: 1.5em;
      margin-top: 1em;
      button {
        color: white;
        background: #171717;
        border-radius: 1em;
        padding: 0.5em 1em 0.5em 1em;
      }
    }
  }
`;

export default ProfileWrapper;
