export interface Comment {
    id: string;
    blog: string;
    content: string;
    authorEmail: string;
    authorName: string;
    authorImageUrl: string;
    createdAt: Date;
  }

export interface Like {
  id: string;
  blog: string;
  authorEmail: string;
  createdAt: Date;
}