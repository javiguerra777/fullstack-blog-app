export type LoginParams = {
  email: string;
  password: string;
};
export type SignUpParams = {
  username: string;
  password: string;
  email: string;
  profile_picture: any;
};
export type UpdateUserParams = {
  userId: string;
  body: {
    id: string;
    username: string;
    newusername: string;
  };
};
export type UpdatePasswordParams = {
  userId: string;
  body: {
    id: string;
    password: string;
  };
};
export default {};
