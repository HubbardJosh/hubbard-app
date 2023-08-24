const BASE_API_URL = "https://kitsu.io/api/edge";

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

export const getAnime = async (pageSize?: number) => {
  const rsp = await apiService.get(`anime?page[limit]=${pageSize ?? 10}`);
  return { status: rsp.status, body: rsp.body };
};
export const getAnimeById = async (id: string) => {
  const rsp = await apiService.get(`anime/${id}`);
  return { status: rsp.status, body: rsp.body };
};
