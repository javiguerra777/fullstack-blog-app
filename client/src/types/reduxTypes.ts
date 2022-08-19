export interface UpdateUserParams {
  userId: string;
  body: {
    id: string;
    username: string;
    newusername: string;
  };
}

export interface UpdatePasswordParams {
  userId: string;
  body: {
    id: string;
    password: string;
  };
}

export interface RequestParams {
  username: string;
  password: string;
}

export interface SignUpParams {
  username: string;
  password: string;
  email: string;
  date: number;
}

export interface UserState {
  userId: string;
  username: string;
  image: string;
  loading: boolean;
  error: boolean;
  loggedIn: boolean;
  displayLogInPrompt: boolean;
  displayCamera: boolean;
  id: string;
  email: string;
}

export type DeletePostParams = {
  id: string;
  userId: string;
};

export type PostState = {
  title: string;
  content: string;
  post: Record<string, unknown>;
  posts: [];
  image: string;
  loading: boolean;
  error: boolean;
};
export type CommentState = {
  comments: [];
  loading: boolean;
  error: boolean;
  comment: string;
};

export type CategoryState = {
  categories: [];
  error: boolean;
  loading: boolean;
};
