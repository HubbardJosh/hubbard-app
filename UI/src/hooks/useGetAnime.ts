import { useEffect, useState } from "react";
import { getAnime } from "../services/services";
import { AnimeResponse } from "../models/AnimeResponse";

export default function useGetAnime(page: number) {
  const [data, setData] = useState<AnimeResponse>();
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    (async function fetchAnimeData(pageNum: number) {
      const rsp = await getAnime(pageNum);
      console.log({ rsp });
      setData(rsp.body);
      setStatus(rsp.status);
    })(page);
  }, [page]);

  return { data, status };
}
