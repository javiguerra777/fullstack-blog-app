import styled from 'styled-components';

export const FormContentWrapper = styled.div`
  padding: 0 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  textarea {
    resize: none;
  }
  @media (min-width: 800px) {
    width: 75%;
  }
`;
export default {};
