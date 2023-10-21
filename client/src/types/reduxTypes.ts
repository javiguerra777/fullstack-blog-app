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
