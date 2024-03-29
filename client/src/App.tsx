import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UseGetStoreUser from './common/hooks/UseGetStoreUser';
import Home from './features/landing-page/Home';
// import Post from './pages/Post';
import Main from './common/components/Main';
import WebCamUpload from './pages/WebCamUpload';
import NotFound from './common/components/NotFound';
import RegistrationRoutes from './features/registration/RegistrationRoutes';
import UserAccountRoutes from './features/user-account/UserAccountRoutes';
import PostsRoutes from './features/posts/PostsRoutes';

type RoutesType = {
  loggedin: boolean;
  children: React.ReactElement;
};

// protect routes against users who are not logged in, will reroute them to the home page
function ProtectedRoute({ loggedin, children }: RoutesType) {
  if (!loggedin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const { loggedIn } = UseGetStoreUser();
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        {/*
        NewPost is a protected route and requires
        a user to be logged in to access this page
         */}
        <Route
          path="/post/*"
          element={
            <ProtectedRoute loggedin={loggedIn}>
              <PostsRoutes />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/post/:id" element={<Post />} /> */}
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
        <Route
          path="/account-info/*"
          element={
            <ProtectedRoute loggedin={loggedIn}>
              <UserAccountRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/register/*" element={<RegistrationRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
