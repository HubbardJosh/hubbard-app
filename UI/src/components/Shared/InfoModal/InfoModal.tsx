import Box from "@mui/material/Box";
import { useCallback, useEffect } from "react";
import styles from "./InfoModal.module.scss";
import { NavLink } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";

interface InfoModalProps {
  isOpen: boolean;
  close: () => void;
  trailerUrl?: string;
  title: string;
  rating?: string;
}
export function InfoModal({
  isOpen,
  close,
  trailerUrl,
  title,
  rating,
}: InfoModalProps) {
  const keyPress = useCallback(
    (e: { key: string }) => {
      if (e.key === "Escape") {
        close();
      }
    },
    [close]
  );
  useEffect(() => {
    document.addEventListener("keyup", keyPress);
    return () => document.removeEventListener("keyup", keyPress);
  }, [keyPress]);

  return (
    <Dialog
      className={styles.dialog}
      open={isOpen}
      onClose={close}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "75%",
          "::-webkit-scrollbar-track": { background: "transparent" },
          scrollbarColor: "#acacac transparent",
        },
      }}
      disableScrollLock
    >
      <Box className={styles.modalContainer}>
        {`Title: ${title}`}
        <Box>
          {"Trailer: "}
          {trailerUrl ? (
            <NavLink to={trailerUrl} target="_blank" rel="noopener noreferrer">
              {trailerUrl}
            </NavLink>
          ) : (
            <>N/A</>
          )}
        </Box>
        {rating && <Typography>{`Rating: ${rating}`}</Typography>}
      </Box>
    </Dialog>
  );
}
