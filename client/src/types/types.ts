export interface CommentsArray {
  username: string;
  comment: string;
  date: string;
  profilepicture: string;
}

export interface LikesParams {
  postId: string;
  userId: string;
  body: {
    uniqueUserId: string;
  };
}

export interface ResetPasswordParams {
  token: string;
  body: {
    password: string;
  };
}

export interface ValidateEmail {
  email: string;
}
