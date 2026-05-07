export type DummyJsonListResponse<T> = {
  users: T[];
  total: number;
  skip: number;
  limit: number;
};

