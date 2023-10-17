import styled from 'styled-components';

export const StyledErrorWrapper = styled.div`
  position: absolute;
  width: 100vw;
  top: 50px;
  display: flex;
  justify-content: center;
  .error-container {
    background-color: #c41e3a;
    padding: 5px;
    border-radius: 10px;
    width: 80%;
    display: flex;
    p {
      font-size: 20px;
    }
    button {
      height: 30px;
      width: 30px;
    }
  }
`;
export default {};
