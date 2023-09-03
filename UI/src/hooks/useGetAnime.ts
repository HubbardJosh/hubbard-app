import { useEffect, useState } from "react";
import { getAnime } from "../services/services";
import { AnimeResponse } from "../models/AnimeResponse";
import { SelectedFilters } from "../models/Filter";

export default function useGetAnime(
  page: number,
  sort?: string,
  letter?: string,
  filters?: {
    [key: string]: SelectedFilters;
  }
) {
  const [animeData, setAnimeData] = useState<AnimeResponse>();
  const [status, setStatus] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchAnimeData(pageNum: number) {
      setLoading(true);
      const rsp = await getAnime(pageNum, sort ?? "title", letter, filters);
      console.log({ rsp });
      setAnimeData(rsp.body);
      setStatus(rsp.status);
      setLoading(false);
    })(page);
  }, [filters, letter, page, sort]);

  return { animeData, status, loading };
}
