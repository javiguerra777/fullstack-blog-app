import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from './common/components/Navbar';
import GlobalStyles from './styles/GlobalStyles';

const StyledError = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
type ErrorTypes = {
  children?: ReactNode;
};

type PropTypes = {
  children: ReactNode;
};

type StateTypes = {
  error: Error | null;
};

// eslint-disable-next-line max-len
// # Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in component constructors full the whole tree below them.
class ErrorBoundary extends Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = { error: null };
  }

  // ? MUST return an updated state object and MUST NOT trigger side effects
  static getDerivedStateFromError(error: ErrorTypes) {
    return { error };
  }

  // ? CAN trigger side effects; commonly used to log out any errors
  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <>
          <GlobalStyles />
          <Navbar />
          <StyledError>
            <h1>Oops!</h1>
            <p>
              Looks like there was an issue on our end. Get on back
              the home page while we get things worked out.
            </p>
            <Link to="/">Home</Link>
          </StyledError>
        </>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
