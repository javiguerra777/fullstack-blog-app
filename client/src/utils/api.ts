import axios from 'axios';
import { ResetPasswordParams, ValidateEmail } from '../types/types';
import baseUrl from '../environment';

export const validateEmailOnServer = async (
  request: ValidateEmail,
) => {
  const { data } = await axios.post(`${baseUrl}user`, request);
  return data;
};
export const validateUserOnServer = async (token: string) => {
  const { data } = await axios.get(`${baseUrl}validateUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const resetPassword = async ({
  body,
  token,
}: ResetPasswordParams) => {
  const { data } = await axios.put(`${baseUrl}resetPassword`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export default {};
