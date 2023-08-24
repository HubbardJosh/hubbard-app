import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import { getAnime } from "../../services/services";
import { AnimeResponse } from "../../models/AnimeResponse";
import styles from "./AnimeSearch.module.scss";
import Pagination from "@mui/material/Pagination";
import { DEFAULT_PAGE_SIZE } from "../../util/constants";

export function AnimeSearch() {
  const [anime, setAnime] = useState<AnimeResponse>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const handleTestClick = async () => {};

  useEffect(() => {
    async function fetchAnimeData() {
      const rsp = await getAnime(20, (currentPage - 1) * DEFAULT_PAGE_SIZE);
      setAnime(rsp.body);
      setPageCount(Math.ceil(rsp?.body?.meta.count / DEFAULT_PAGE_SIZE));
    }
    fetchAnimeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    const rsp = await getAnime(20, (page - 1) * DEFAULT_PAGE_SIZE);
    setAnime(rsp.body);
  };

  const getRandomBGColor = () => {
    let val1 = Math.random() * 255;
    let val2 = Math.random() * 255;
    let val3 = Math.random() * 255;

    return `rgba(${val1}, ${val2}, ${val3}, 0.5)`;
  };

  return (
    <Box className={styles.animeListContainer}>
      <Button onClick={() => handleTestClick()}>Get</Button>
      {anime && (
        <>
          <ImageList className={styles.imageList} cols={5}>
            {anime.data?.map((show: any) => (
              <ImageListItem sx={{ maxWidth: "270px" }} key={show.id}>
                {show?.attributes?.coverImage ? (
                  <Box className={styles.imageContainer}>
                    <Box className={styles.overlay}>
                      {show?.attributes?.titles?.en ??
                        show?.attributes?.titles?.en_jp ??
                        ""}
                      <br />
                      {show?.attributes?.titles?.ja_jp ?? ""}
                    </Box>
                    <img
                      src={
                        show?.attributes?.posterImage?.small ??
                        show?.attributes?.coverImage?.small ??
                        ""
                      }
                      alt={show?.attributes?.titles?.en ?? ""}
                      loading="lazy"
                    />
                  </Box>
                ) : (
                  <Box
                    className={styles.noImageContainer}
                    sx={{
                      backgroundColor: getRandomBGColor(),
                    }}
                  >
                    {show?.attributes?.titles?.en ??
                      show?.attributes?.titles?.en_jp ??
                      ""}
                    <br />
                    {show?.attributes?.titles?.ja_jp ?? ""}
                  </Box>
                )}
              </ImageListItem>
            ))}
          </ImageList>
          <Pagination
            count={pageCount}
            onChange={(_, page) => handlePageChange(page)}
          />
        </>
      )}
    </Box>
  );
}
