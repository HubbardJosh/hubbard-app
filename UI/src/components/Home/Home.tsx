import Box from "@mui/material/Box";
import { PageTabs } from "../PageTabs/PageTabs";
import styles from "./Home.module.scss";

export function Home() {
  return (
    <Box className={styles.tabsContainer}>
      <PageTabs />
    </Box>
  );
}
