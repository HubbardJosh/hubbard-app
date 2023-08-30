import { SelectedFilters } from "../models/Filter";
import { DEFAULT_PAGE_SIZE } from "../util/constants";
const BASE_API_URL = "https://api.jikan.moe/v4";

class ApiService {
  private url: string;

  constructor() {
    this.url = BASE_API_URL;
  }

  public async get(
    suffix: string,
    body?: any,
    signal?: AbortSignal
  ): Promise<{ body: any; status: number }> {
    const headers = new Headers();
    headers.append("Accept", "application/vnd.api+json");
    headers.append("Content-Type", " application/vnd.api+json");

    try {
      const response = await fetch(`${this.url}/${suffix}`, {
        method: "GET",
        headers,
        body: body ? JSON.stringify(body) : undefined,
        redirect: "follow",
        signal,
      });

      return {
        body: await response.json(),
        status: response.status,
      };
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
}

const apiService = new ApiService();

export const getAnime = async (
  page?: number,
  letter?: string,
  filters?: {
    [key: string]: SelectedFilters;
  }
) => {
  const rsp = await apiService.get(
    `anime?limit=${DEFAULT_PAGE_SIZE}&order_by=title&sort=asc&page=${
      page ?? 1
    }${letter && letter !== "#" ? `&letter=${letter}` : ""}${
      filters && Object.keys(filters).length > 0
        ? `${Object.values(filters)
            .map(
              (v) => `&${v.filterType}=${v.filters.join(`&${v.filterType}=`)}`
            )
            .join("")}`
        : ""
    }`
  );
  return { status: rsp.status, body: rsp.body };
};
export const getAnimeById = async (id: string) => {
  const rsp = await apiService.get(`anime/${id}`);
  return { status: rsp.status, body: rsp.body };
};
