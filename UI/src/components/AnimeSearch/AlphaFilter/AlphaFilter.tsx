import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import styles from "./AlphaFilter.module.scss";
import { BaseSyntheticEvent, useState } from "react";

interface AlphaFilterProps {
  selectChange: (char: string) => void;
}
export function AlphaFilter({ selectChange }: AlphaFilterProps) {
  const [selectedChar, setSelectedChar] = useState("#");
  const charArray = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleSelect = (e: BaseSyntheticEvent) => {
    const ch = e.target.textContent === "All" ? "#" : e.target.textContent;
    setSelectedChar(ch);
    selectChange(ch);
  };

  return (
    <Breadcrumbs className={styles.breadcrumbs} separator="" maxItems={27}>
      {charArray.map((char) => (
        <Button
          className={selectedChar === char ? styles.selected : ""}
          key={char}
          onClick={(e) => handleSelect(e)}
        >
          {char === "#" ? "All" : char}
        </Button>
      ))}
    </Breadcrumbs>
  );
}
