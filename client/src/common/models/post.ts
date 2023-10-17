export type PostModel = {
  body: string;
  category: string;
  title: string;
  username: string;
  id: number;
  created_at: string;
  user_id?: number;
  email?: string;
  profile_picture: string;
  image?: string;
  comments?: any[];
  likes?: any[];
};

export default {};
