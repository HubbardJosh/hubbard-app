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

export const TYPE_FILTERS: { [key: string]: Filter } = {
  movie: {
    val: "movie",
    displayVal: "Movie",
    description: "Sort by type: Movie",
  },
  music: {
    val: "music",
    displayVal: "Music",
    description: "Sort by type: Music",
  },
  ona: {
    val: "ona",
    displayVal: "ONA",
    description: "Sort by type: ONA",
  },
  ova: {
    val: "ova",
    displayVal: "OVA",
    description: "Sort by type: OVA",
  },
  special: {
    val: "special",
    displayVal: "Special",
    description: "Sort by type: Special",
  },
  tv: {
    val: "tv",
    displayVal: "TV",
    description: "Sort by type: TV",
  },
};
