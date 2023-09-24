import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Filter, FilterTypes } from "../../../models/Filter";
import OutlinedInput from "@mui/material/OutlinedInput";
import styles from "./DropdownFilter.module.scss";
import Radio from "@mui/material/Radio";

interface DropdownFilterProps {
  filters: { [key: string]: Filter };
  dropdownLabel?: string;
  filterType: FilterTypes;
  isMultiSelect?: boolean;
  handleSelectedFilters: (filters: string[], filterType: FilterTypes) => void;
}

export function DropdownFilter({
  filters,
  dropdownLabel,
  filterType,
  isMultiSelect = false,
  handleSelectedFilters,
}: DropdownFilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterSelect = (
    event: SelectChangeEvent<typeof selectedFilters>
  ) => {
    console.log(event);
    const {
      target: { value },
    } = event;
    setSelectedFilters(typeof value === "string" ? value.split(",") : value);
    handleSelectedFilters(
      typeof value === "string" ? value.split(",") : value,
      filterType
    );
  };
  return (
    <div className={styles.dropdownContainer}>
      <FormControl size="small">
        <InputLabel>{dropdownLabel ?? ""}</InputLabel>
        <Select
          multiple={isMultiSelect}
          value={selectedFilters}
          onChange={handleFilterSelect}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) =>
            selected.map((s) => filters[s].displayVal).join(", ")
          }
          MenuProps={{
            sx: {
              width: "calc(100% - 16px)",
              div: {
                li: {
                  padding: "0 12px 0 0",
                },
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            disableScrollLock: true,
          }}
        >
          {Object.values(filters).map((filter) => (
            <MenuItem key={filter.val} value={filter.val}>
              {isMultiSelect ? (
                <Checkbox checked={selectedFilters.indexOf(filter.val) > -1} />
              ) : (
                <Radio checked={selectedFilters.indexOf(filter.val) > -1} />
              )}
              <ListItemText primary={filter.displayVal} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
