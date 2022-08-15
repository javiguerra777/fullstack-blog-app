import React from 'react';
import styled from 'styled-components';

type NotificationProps = {
  message: string;
  clearMessage: () => void;
};

const NotificationWrapper = styled.section`
  background-color: lightgray;
  width: 60vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1em 0 1em;
  border-radius: 1em;
`;
function Notification({ message, clearMessage }: NotificationProps) {
  return (
    <NotificationWrapper>
      <p>{message}</p>
      <button type="button" onClick={clearMessage}>
        X
      </button>
    </NotificationWrapper>
  );
}

export default Notification;
