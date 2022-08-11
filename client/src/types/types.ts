export interface Category {
  _id: string;
  category: string;
  username: string;
  date: number;
  __v: number;
}

export interface CommentsArray {
  username: string;
  comment: string;
  date: number;
}
