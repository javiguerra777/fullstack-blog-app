import styled from 'styled-components';
import { PageHeight } from '../../../common/styles/StyleVariables';

export const UserInfoWrapper = styled.main`
  overflow: auto;
  height: ${PageHeight};
  padding: 0 20px 100px 20px;;
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile-pic-wrapper {
    max-width: 1200px;
    .icon {
      top: -20px;
      right -20px;
      width: 50px;
      height: 50px;
    }
    .profile-pic {
      max-width: 600px;
    }
  }
`;
export default {};
