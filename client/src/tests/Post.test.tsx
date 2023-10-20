import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
import store from '../store';
import Post from '../features/landing-page/components/Post';

test('Verifying that all elements are present', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Post
          id={0}
          username=""
          title=""
          body=""
          category=""
          created_at=""
          image=""
          likes={[]}
          comments={[]}
          profile_picture=""
        />
      </BrowserRouter>
    </Provider>,
  );

  const userIcon = await screen.getByAltText('user icon');
  const title = await screen.getByTestId('title');
  const username = await screen.getByTestId('username');

  //   const menuButton = await screen.
  //   const likeBtn = await screen.
  //   const commentBn = await screen.
  //   const category = await screen.
  //   const postContent = await screen.

  expect(userIcon).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});
