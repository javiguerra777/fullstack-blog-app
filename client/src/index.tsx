import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import EditPost from './components/EditPost';
import NewPost from './components/NewPost';
import Home from './pages/Home';
import Post from './components/Post';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/newPost" element={<NewPost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/editPost/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
