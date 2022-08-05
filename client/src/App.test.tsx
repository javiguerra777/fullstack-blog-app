import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import NewPost from './components/NewPost';

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

// new post component tests
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

  expect(form).toBeInTheDocument();
  expect(newPostDescription).toBeInTheDocument();
  expect(select).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();
  expect(file).toBeInTheDocument();
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

  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

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

  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

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

  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();

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

  expect(form).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();
  expect(file).toBeInTheDocument();

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

  expect(form).toBeInTheDocument();
  expect(select).toBeInTheDocument();

  expect(select).toHaveTextContent('none');
});
