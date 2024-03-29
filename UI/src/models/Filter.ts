export interface Filter {
  val: string;
  displayVal: string;
  description?: string;
}

export enum SortTypes {
  "score" = "score",
  "title" = "title",
}

export enum FilterTypes {
  "rating" = "rating",
  "sort" = "sort",
  "type" = "type",
}

export interface SelectedFilters {
  filters: string[];
  filterType: FilterTypes;
}
