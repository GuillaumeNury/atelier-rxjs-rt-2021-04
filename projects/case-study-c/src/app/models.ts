export interface IAlbum {
  id: number;
  userId: number;
  title: string;
}

export interface IQuery {
  search: string;
  page: number;
}