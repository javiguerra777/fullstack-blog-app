import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';
import CommentPage from './pages/CommentPage';

export default function PostsRoutes() {
  return (
    <Routes>
      <Route path="/new-post" element={<NewPost />} />
      <Route path="/edit-post/:id" element={<EditPost />} />
      <Route path="/details/:id" element={<CommentPage />} />
    </Routes>
  );
}
