import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import EditPost from './components/EditPost';
import NewPost from './components/NewPost';
import Home from './pages/Home';
import Post from './pages/Post';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import Main from './pages/Main';

type RoutesType = {
  loggedin: boolean;
  children: any;
};

// protect routes against users who are not logged in, will reroute them to the home page
function ProtectedRoute({ loggedin, children }: RoutesType) {
  if (!loggedin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const { loggedIn } = useSelector(
    (state: any) => state.user,
    shallowEqual,
  );
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        {/*
        NewPost is a protected route and requires
        a user to be logged in to access this page
         */}
        <Route
          path="/newPost"
          element={
            <ProtectedRoute loggedin={loggedIn}>
              <NewPost />
            </ProtectedRoute>
          }
        />
        <Route path="/post/:id" element={<Post />} />
        {/*
        EditPost is a protected route and requires
        a user to be logged in to access this page
        */}
        <Route
          path="/editPost/:id"
          element={
            <ProtectedRoute loggedin={loggedIn}>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
