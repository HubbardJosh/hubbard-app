import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { NavLink } from "../../models/NavLink";
import styles from "./NavBar.module.scss";

export function NavBar() {
  const links: NavLink[] = [
    { displayName: "Home", url: "/" },
    { displayName: "Test Page", url: "/test" },
  ];

  return (
    <Box className={styles.navBarContainer}>
      {links.map((link) => (
        <Link className={styles.navLink} to={link.url} key={link.url}>
          {link.displayName}
        </Link>
      ))}
    </Box>
  );
}
