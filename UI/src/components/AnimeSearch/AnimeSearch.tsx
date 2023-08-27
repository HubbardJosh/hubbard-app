import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import useGetAnime from "../../hooks/useGetAnime";
import styles from "./AnimeSearch.module.scss";
import { AlphaFilter } from "./AlphaFilter/AlphaFilter";

export function AnimeSearch() {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChar, setSelectedChar] = useState<string>("");
  const { animeData, loading } = useGetAnime(currentPage, selectedChar);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCharSelect = (char: string) => {
    const ch = char === "All" ? "" : char;
    setSelectedChar(ch);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!loading && animeData) {
      console.log({ animeData });
      const { pagination } = animeData;
      setPageCount(
        Math.ceil(pagination?.items.total / pagination?.items.per_page)
      );
    }
  }, [animeData, loading]);

  const getRandomBGColor = () => {
    let val1 = Math.random() * 255;
    let val2 = Math.random() * 255;
    let val3 = Math.random() * 255;

    return `rgba(${val1}, ${val2}, ${val3}, 0.5)`;
  };

  return (
    <Box className={styles.animeListContainer}>
      <AlphaFilter selectChange={(ch) => handleCharSelect(ch)} />
      {!loading && animeData && (
        <>
          <ImageList className={styles.imageList} cols={6}>
            {animeData?.data?.map((show: any) => (
              <ImageListItem sx={{ maxWidth: "270px" }} key={show.mal_id}>
                {show?.images ? (
                  <Box className={styles.imageContainer}>
                    <Box className={styles.overlay}>
                      {show?.titles
                        ?.filter(
                          (t) =>
                            t.type === "Default" ||
                            t.type === "English" ||
                            t.type === "Japanese"
                        )
                        ?.sort((a, _) =>
                          a.type === "English"
                            ? -1
                            : a.type === "Default"
                            ? 0
                            : 1
                        )
                        ?.map((title, i, arr) => (
                          <>
                            {title.title}
                            {i !== arr.length - 1 && <hr />}
                          </>
                        ))}
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
            page={currentPage}
            siblingCount={2}
            boundaryCount={1}
            onChange={(_, page) => handlePageChange(page)}
          />
        </>
      )}
    </Box>
  );
}
