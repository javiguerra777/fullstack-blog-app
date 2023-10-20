import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../store';
import NewPost from '../features/posts/pages/NewPost';

test('check if new post form is displayed', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <NewPost />
      </BrowserRouter>
    </Provider>,
  );
  const form = await screen.getByTestId('form');
  const newPostDescription = await screen.getByTestId('new-post');
  const select = await screen.getByTestId('select');
  const submitButton = await screen.getByRole('button');
  const title = await screen.getByTestId('title-input');
  const textarea = await screen.getByTestId('textarea');
  const file = await screen.getByTestId('file-input');

  /*
  checks that a p tag, form, input, select, text area,
   and button are loading when the screen renders
  */
  expect(form).toBeInTheDocument();
  expect(newPostDescription).toBeInTheDocument();
  expect(select).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();
  expect(file).toBeInTheDocument();

  // expects that the p tag has text content of new post
  expect(newPostDescription).toHaveTextContent(/new post/i);
});

test('check that button has the right text and attributes', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <NewPost />
      </BrowserRouter>
    </Provider>,
  );
  const form = await screen.getByTestId('form');
  const submitButton = await screen.getByRole('button');

  // expects the form and button to be on the page upon render
  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  // expects the button to have a type of submit and text content of post
  expect(submitButton).toHaveAttribute('type', 'submit');
  expect(submitButton).toHaveTextContent(/post/i);
});

test('check that button is disabled on render', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <NewPost />
      </BrowserRouter>
    </Provider>,
  );
  const form = await screen.getByTestId('form');
  const submitButton = await screen.getByRole('button');

  // exoects a form and button to be on the screen
  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  // expects that the button is disabled on render
  expect(submitButton).toBeDisabled();
});

test('check that button is not disabled after text is input', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <NewPost />
      </BrowserRouter>
    </Provider>,
  );
  const form = await screen.getByTestId('form');
  const submitButton = await screen.getByRole('button');
  const title = await screen.getByTestId('title-input');
  const textarea = await screen.getByTestId('textarea');

  // expects that a form, button, input and text are on screen
  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();

  // button should be disabled
  expect(submitButton).toBeDisabled();

  // button should be disabled after user inputs text to title input
  await userEvent.type(title, 'Hello World');
  expect(submitButton).toBeDisabled();

  // button should not be disabled after user fills text area
  await userEvent.type(textarea, 'Filler text for this test');
  expect(submitButton).not.toBeDisabled();

  // if title is empty button should be disabled
  userEvent.clear(title);
  expect(submitButton).toBeDisabled();

  // if the text area is empty then button should be disabled
  userEvent.clear(textarea);
  expect(submitButton).toBeDisabled();
});

test('check if form fields are empty on render', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <NewPost />
      </BrowserRouter>
    </Provider>,
  );
  const form = await screen.getByTestId('form');
  const title = await screen.getByTestId('title-input');
  const textarea = await screen.getByTestId('textarea');
  const file = await screen.getByTestId('file-input');

  // expects form, input, title, and file to be on screen
  expect(form).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();
  expect(file).toBeInTheDocument();

  // title input, text area, and file input should be empty on render
  expect(title).toHaveTextContent('');
  expect(textarea).toHaveTextContent('');
  expect(file).toHaveTextContent('');
});

test('check that select has default of none', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <NewPost />
      </BrowserRouter>
    </Provider>,
  );
  const form = await screen.getByTestId('form');
  const select = await screen.getByTestId('select');

  // form and select should be on screen
  expect(form).toBeInTheDocument();
  expect(select).toBeInTheDocument();

  // select should have default option of none on render
  expect(select).toHaveTextContent('none');
});
