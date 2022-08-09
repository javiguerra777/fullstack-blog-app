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
import WebCamUpload from './pages/WebCamUpload';
import NotFound from './pages/NotFound';

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
        {/* WebCamUpload is a protected route where users
        upload an image taken from React Webcam */}
        <Route
          path="uploadImage"
          element={
            <ProtectedRoute loggedin={loggedIn}>
              <WebCamUpload />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
