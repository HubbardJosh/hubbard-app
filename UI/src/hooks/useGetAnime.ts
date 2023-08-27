import { useEffect, useState } from "react";
import { getAnime } from "../services/services";
import { AnimeResponse } from "../models/AnimeResponse";

export default function useGetAnime(page: number, letter?: string) {
  const [animeData, setAnimeData] = useState<AnimeResponse>();
  const [status, setStatus] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchAnimeData(pageNum: number) {
      setLoading(true);
      const rsp = await getAnime(pageNum, letter);
      console.log({ rsp });
      setAnimeData(rsp.body);
      setStatus(rsp.status);
      setLoading(false);
    })(page);
  }, [letter, page]);

  return { animeData, status, loading };
}
