import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from './store';
import App from './App';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';

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

  await userEvent.type(title, 'Hello World');
  expect(submitButton).toBeDisabled();

  await userEvent.type(textarea, 'Filler text for this test');
  expect(submitButton).not.toBeDisabled();

  userEvent.clear(title);
  expect(submitButton).toBeDisabled();

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

// edit post component tests
test('check that edit form is displaying', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditPost />
      </BrowserRouter>
    </Provider>,
  );
  const description = await screen.getByTestId(
    'edit-post-description',
  );
  const select = await screen.getByTestId('select-edit-category');
  const form = await screen.getByTestId('edit-form');
  const title = await screen.getByTestId('edit-title');
  const textarea = await screen.getByTestId('edit-content');
  const submitButton = await screen.getByRole('button');

  expect(description).toBeInTheDocument();
  expect(select).toBeInTheDocument();
  expect(form).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  expect(description).toHaveTextContent(/edit post/i);
});

test('check that edit form fields display proper information', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditPost />
      </BrowserRouter>
    </Provider>,
  );

  const form = await screen.getByTestId('edit-form');
  const title = await screen.getByTestId('edit-title');
  const textarea = await screen.getByTestId('edit-content');

  expect(form).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();

  expect(title).not.toHaveTextContent('');
  expect(textarea).not.toHaveTextContent('');
});

test('check that button is not disabled on render', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditPost />
      </BrowserRouter>
    </Provider>,
  );
  const form = await screen.getByTestId('edit-form');
  const submitButton = await screen.getByRole('button');

  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  expect(submitButton).not.toBeDisabled();
});

test('check that button is disabled after inputs are cleared', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditPost />
      </BrowserRouter>
    </Provider>,
  );
  const form = await screen.getByTestId('edit-form');
  const title = await screen.getByTestId('edit-title');
  const textarea = await screen.getByTestId('edit-content');
  const submitButton = await screen.getByRole('button');

  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();

  userEvent.clear(title);
  expect(submitButton).toBeDisabled();

  userEvent.clear(textarea);
  expect(submitButton).toBeDisabled();
});

test('check that button is not disabled after text is input', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditPost />
      </BrowserRouter>
    </Provider>,
  );
  const form = await screen.getByTestId('edit-form');
  const title = await screen.getByTestId('edit-title');
  const textarea = await screen.getByTestId('edit-content');
  const submitButton = await screen.getByRole('button');

  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();

  expect(submitButton).toBeDisabled();

  await userEvent.type(title, 'Hello World');
  expect(submitButton).toBeDisabled();

  await userEvent.type(textarea, 'Filler text for this test');
  expect(submitButton).not.toBeDisabled();

  userEvent.clear(title);
  expect(submitButton).toBeDisabled();

  userEvent.clear(textarea);
  expect(submitButton).toBeDisabled();
});
