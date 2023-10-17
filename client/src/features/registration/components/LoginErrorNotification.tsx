import React, { useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '../../../hook';
import { clearError } from '../../../store/UserSlice';

const StyledError = styled.div`
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
export default function LoginErrorNotification() {
  const dispatch = useAppDispatch();
  const closeThis = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);
  return (
    <StyledError>
      <div className="error-container">
        <p>Error Logging into account</p>
        <button type="button" onClick={closeThis}>
          <AiOutlineClose />
        </button>
      </div>
    </StyledError>
  );
}
