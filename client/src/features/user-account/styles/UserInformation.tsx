import styled from 'styled-components';
import { PageHeight } from '../../../common/styles/StyleVariables';

export const UserInfoWrapper = styled.main`
  overflow: auto;
  height: ${PageHeight};
  padding: 0 20px;
  .profile-pic-wrapper {
    width: 200px;
    .icon {
      top: -20px;
      right -20px;
      width: 50px;
      height: 50px;
    }
  }
`;
export default {};
