export interface Environment {
  token: string | null;
  remote: {
    owner: string;
    repository: string;
  };
}
