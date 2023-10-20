import styled from 'styled-components';

export const DeleteWrapper = styled.section`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .delete-prompt {
    position: absolute;
    top: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #171717;
    height: auto;
    width: auto;
    padding: 0 1.5em 1em 1.5em;
    h1 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export default {};
