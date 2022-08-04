import React from 'react';
import styled from 'styled-components';

const NotFoundWrapper = styled.section`
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  header {
    align-self: center;
  }
`;
function NotFound() {
  return (
    <NotFoundWrapper>
      <header>
        <h1>Error 404: Page Not Found</h1>
      </header>
    </NotFoundWrapper>
  );
}

export default NotFound;
