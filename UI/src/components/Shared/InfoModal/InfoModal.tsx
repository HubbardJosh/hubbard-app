import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useCallback, useEffect, useState } from "react";
import styles from "./InfoModal.module.scss";
import { NavLink } from "react-router-dom";

interface InfoModalProps {
  isOpen: boolean;
  close: () => void;
  trailerUrl?: string;
  title: string;
}
export function InfoModal({
  isOpen,
  close,
  trailerUrl,
  title,
}: InfoModalProps) {
  console.log({ trailerUrl });
  const [preventClose, setPreventClose] = useState(true);
  const keyPress = useCallback(
    (e: { key: string }) => {
      if (e.key === "Escape") {
        setPreventClose(true);
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
    <Backdrop open={isOpen} sx={{ zIndex: 998 }}>
      <ClickAwayListener
        onClickAway={() => {
          if (preventClose) {
            setPreventClose(false);
          } else {
            setPreventClose(true);
            close();
          }
        }}
      >
        <Box className={styles.modalContainer}>
          {`Title: ${title}`}
          <Box>
            {"Trailer: "}
            {trailerUrl ? (
              <NavLink
                to={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {trailerUrl}
              </NavLink>
            ) : (
              <>N/A</>
            )}
          </Box>
        </Box>
      </ClickAwayListener>
    </Backdrop>
  );
}
