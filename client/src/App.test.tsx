import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

// main application test this tests that browser router and redux are correctly set up
test('renders application', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
});

// new post component test
test('check if new post form is displayed', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
  const form = await screen.getByTestId('form');
  const newPostDescription = await screen.getByTestId('new-post');
  const select = await screen.getByTestId('select');
  const submitButton = await screen.getByRole('button', {
    text: /post/i,
  });
  const title = await screen.getByTestId('title-input');
  const textarea = await screen.getByTestId('textarea');
  const file = await screen.getByTestId('file-input');
});
