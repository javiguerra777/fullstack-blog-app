import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../store';
import EditPost from '../components/EditPost';

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

  // p tag, select, form, title input, text area, and button should be on screen
  expect(description).toBeInTheDocument();
  expect(select).toBeInTheDocument();
  expect(form).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  // description p tag should have text content edit post
  expect(description).toHaveTextContent(/edit post/i);
});

test('check that edit form fields are not empty on render', async () => {
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

  // form, title and text area should be on screen
  expect(form).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();

  // title and text area should have prefilled text, so they should not be empty
  expect(title).toEqual(expect.not.stringMatching(''));
  expect(textarea).toEqual(expect.not.stringMatching(''));
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

  // form and button should be in document
  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  // button should not be disabled on render
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

  // form, button, title and text area should be on screen
  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();

  // if title is empty then the button should be disabled
  userEvent.clear(title);
  expect(submitButton).toBeDisabled();

  // if the text area is also empty then button should be disabled
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

  // form, button, title, text area should be on screen
  expect(form).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();

  // button should not be disabled on render
  expect(submitButton).not.toBeDisabled();

  // clearing both the title and text area fields
  userEvent.clear(title);
  userEvent.clear(textarea);

  // button should not be disabled, both field have text on render
  await userEvent.type(title, 'Hello World');
  expect(submitButton).toBeDisabled();

  await userEvent.type(textarea, 'Filler text for this test');
  expect(submitButton).not.toBeDisabled();

  // if title is empty then button should be disabled
  userEvent.clear(title);
  expect(submitButton).toBeDisabled();

  // if text area is also empty then button should be disabled
  userEvent.clear(textarea);
  expect(submitButton).toBeDisabled();
});
