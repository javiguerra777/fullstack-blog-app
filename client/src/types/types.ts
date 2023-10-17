export interface Category {
  category: string;
}

export interface Date {
  date: number;
}

export interface CommentsArray {
  username: string;
  comment: string;
  date: string;
  profilepicture: string;
}

export interface PostProps {
  id: string;
  username: string;
  title: string;
  content: string;
  category: string;
  date: number;
  image: string;
  likes: string[];
  comments: [];
  profilepicture: string;
}

export interface ExistingUser {
  username: string;
  email: string;
}

export interface CategoryParams {
  category: string;
  username: string;
  date: number;
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
