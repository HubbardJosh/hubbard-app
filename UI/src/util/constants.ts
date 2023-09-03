import { Filter } from "../models/Filter";

export const DEFAULT_PAGE_SIZE = 24;

export const RATING_FILTERS: { [key: string]: Filter } = {
  g: { val: "g", displayVal: "G", description: "All Ages" },
  pg: { val: "pg", displayVal: "PG", description: "Children" },
  pg13: { val: "pg13", displayVal: "PG-13", description: "Teens 13 or older" },
  r17: {
    val: "r17",
    displayVal: "R",
    description: "17+ (violence & profanity)",
  },
  r: { val: "r", displayVal: "R+", description: "Mild Nudity" },
  rx: { val: "rx", displayVal: "Rx", description: "Hentai" },
};

export const SCORE_FILTERS: { [key: string]: Filter } = {
  asc: {
    val: "asc",
    displayVal: "Low to High",
    description: "Sort by score - Low to High",
  },
  desc: {
    val: "desc",
    displayVal: "High to Low",
    description: "Sort by score - High to Low",
  },
};
