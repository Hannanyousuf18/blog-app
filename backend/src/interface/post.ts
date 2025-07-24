export interface PostBase {
  title: string;
  body: string;
  authorId: number;
}

export interface Post extends PostBase {
  id: number;
  authorName?: string;
  publishedAt: string;
}
