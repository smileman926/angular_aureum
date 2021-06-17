export interface RequestObjectInterface {
  page: number;
  count: number;
  searchText: string;
  sort: string | null;
  sortBy: number | null;
}
