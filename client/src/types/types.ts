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
