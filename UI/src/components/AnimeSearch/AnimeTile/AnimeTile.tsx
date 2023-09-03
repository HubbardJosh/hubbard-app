import Box from "@mui/material/Box";
import { Title } from "../../../models/ShowTile";
import { util } from "../../../util/util";
import { InfoModal } from "../../Shared/InfoModal/InfoModal";
import { useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import styles from "./AnimeTile.module.scss";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";

interface AnimeTileProps {
  titles?: Title[];
  imageUrl?: string;
  trailerUrl?: string;
  score?: string;
}
export function AnimeTile({
  trailerUrl,
  titles,
  imageUrl,
  score,
}: AnimeTileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log({ titles, imageUrl, trailerUrl });

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <Box className={styles.tileContainer} onClick={() => setIsModalOpen(true)}>
      {trailerUrl && (
        <Icon className={styles.trailerIcon}>
          <VideocamIcon />
        </Icon>
      )}
      {score && <Typography className={styles.scoreLabel}>{score}</Typography>}
      {imageUrl ? (
        <Box className={styles.imageContainer}>
          <Box className={styles.overlay}>
            {titles
              ?.sort((t1, t2) => (t1.order > t2.order ? 1 : -1))
              ?.map((title, i, arr) => (
                <>
                  {title.text}
                  {i !== arr.length - 1 && <hr />}
                </>
              ))}
          </Box>
          <img
            src={imageUrl}
            alt={titles?.find((t) => t.order === 1).text ?? ""}
            loading="lazy"
          />
        </Box>
      ) : (
        <Box
          className={styles.noImageContainer}
          sx={{
            backgroundColor: util.getRandomBGColor(),
          }}
        >
          {titles
            ?.sort((t1, t2) => (t1.order > t2.order ? 1 : -1))
            ?.map((title, i, arr) => (
              <>
                {title.text}
                {i !== arr.length - 1 && <hr />}
              </>
            ))}
        </Box>
      )}

      <InfoModal
        isOpen={isModalOpen}
        close={handleModalClose}
        trailerUrl={trailerUrl}
        title={titles?.find((t) => t.order === 1)?.text ?? "No Title"}
      />
    </Box>
  );
}
