import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import { AnimeResponse } from "../../models/AnimeResponse";
import Pagination from "@mui/material/Pagination";
import useGetAnime from "../../hooks/useGetAnime";
import styles from "./AnimeSearch.module.scss";

export function AnimeSearch() {
  const [anime, setAnime] = useState<AnimeResponse>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const animeData = useGetAnime(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (animeData?.data) {
      const { pagination } = animeData.data;
      setAnime(animeData.data);
      setPageCount(
        Math.ceil(pagination.items.total / pagination.items.per_page)
      );
    }
  }, [animeData.data]);

  const getRandomBGColor = () => {
    let val1 = Math.random() * 255;
    let val2 = Math.random() * 255;
    let val3 = Math.random() * 255;

    return `rgba(${val1}, ${val2}, ${val3}, 0.5)`;
  };

  return (
    <Box className={styles.animeListContainer}>
      {anime && (
        <>
          <ImageList className={styles.imageList} cols={6}>
            {anime?.data?.map((show: any) => (
              <ImageListItem sx={{ maxWidth: "270px" }} key={show.id}>
                {show?.images ? (
                  <Box className={styles.imageContainer}>
                    <Box className={styles.overlay}>
                      {show?.title_english ??
                        (show?.title !== show?.title_japanese
                          ? show?.title
                          : "")}
                      <hr />
                      {show?.title_japanese ?? ""}
                    </Box>
                    <img
                      src={
                        show?.images?.webp?.large_image_url ??
                        show?.images?.jpg?.large_image_url ??
                        ""
                      }
                      alt={show?.title_english ?? show?.title_japanese ?? ""}
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
                    {show?.title_english ?? ""}
                    <hr />
                    {show?.title_japanese ?? ""}
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
