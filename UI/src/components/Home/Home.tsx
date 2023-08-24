import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./Home.module.scss";
import { getAnime, getAnimeById } from "../../services/services";
import { useState } from "react";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import { AnimeResponse } from "../../models/AnimeResponse";
import ImageListItem from "@mui/material/ImageListItem";

export function Home() {
  console.log("first");
  const [anime, setAnime] = useState<AnimeResponse>();
  const handleTestClick = async () => {
    const rsp = await getAnime(20);
    console.log({ rsp });
    setAnime(rsp.body);
  };

  const getRandomBGColor = () => {
    let val1 = Math.random() * 255;
    let val2 = Math.random() * 255;
    let val3 = Math.random() * 255;

    return `rgba(${val1}, ${val2}, ${val3}, 0.5)`;
  };

  return (
    <Box className={styles.homeContainer}>
      <Button onClick={() => handleTestClick()}>Get</Button>
      <ImageList className={styles.imageList} cols={5}>
        {anime?.data?.map((show: any) => (
          <ImageListItem sx={{ maxWidth: "270px" }}>
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
    </Box>
  );
}
