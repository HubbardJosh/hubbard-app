import Box from "@mui/material/Box";
import { useState } from "react";
import { TAB_VALUES } from "../../util/constants";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AnimeSearch } from "../AnimeSearch/AnimeSearch";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
export function PageTabs() {
  const [currTab, setCurrTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setCurrTab(newValue);
  };

  return (
    <Box sx={{ width: "80%" }}>
      <Tabs
        value={currTab}
        onChange={handleChange}
        sx={{
          button: {
            fontWeight: "bold",
          },
        }}
      >
        <Tab label={TAB_VALUES.Anime} />
        <Tab label="Test" />
      </Tabs>
      <CustomTabPanel value={currTab} index={0}>
        <AnimeSearch />
      </CustomTabPanel>
      <CustomTabPanel value={currTab} index={1}>
        <span style={{ width: "100%", height: "100%" }}>testing</span>
      </CustomTabPanel>
    </Box>
  );
}
