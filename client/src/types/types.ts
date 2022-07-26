export interface Category {
  category: string;
}

export interface Date {
  date: number;
}

export interface CommentsArray {
  username: string;
  comment: string;
  date: number;
  profilepicture: string;
}

export interface PostType {
  body: string;
  category: string;
  date: number;
  title: string;
  username: string;
  __v: number;
  _id: string;
  image?: string;
  likes?: [];
  comments: [];
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
