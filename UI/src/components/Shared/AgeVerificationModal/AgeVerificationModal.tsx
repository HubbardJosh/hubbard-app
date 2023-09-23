import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";

interface AgeVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

export const AgeVerificationModal = ({
  isOpen,
  onClose,
  onVerified,
}: AgeVerificationModalProps) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = () => {
    // Convert input values to a Date object
    const birthDate = new Date(`${year}-${month}-${day}`);

    // Calculate age
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      // Subtract 1 from age if the birthdate hasn't occurred this year yet
      age--;
    }

    // Check if the user is 18 or older
    if (age >= 18) {
      // Age is verified
      onVerified();
      onClose();
    } else {
      alert("You must be at least 18 years old to proceed.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Age Verification</DialogTitle>
      <DialogContent>
        <p>Please select your date of birth to continue:</p>
        <FormControl fullWidth>
          <InputLabel>Day</InputLabel>
          <Select value={day} onChange={handleDayChange}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: "24px" }}>
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: "24px" }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={handleYearChange}>
            {Array.from(
              { length: new Date().getFullYear() - 1900 + 1 },
              (_, i) => 1900 + i
            ).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSubmit}>Verify</Button>
      </DialogActions>
    </Dialog>
  );
};
