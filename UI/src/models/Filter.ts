export interface Filter {
  val: string;
  displayVal: string;
  description?: string;
}

export enum FilterTypes {
  "rating" = "rating",
  "test" = "test",
}

export interface SelectedFilters {
  filters: string[];
  filterType: FilterTypes;
}
