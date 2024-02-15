import {
  Alert,
  Button,
  FormControl,
  FormControlProps,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  styled,
} from "@mui/material";
import { useState } from "react";

interface FrequencyOption {
  label: string;
  value: string;
}

const frequencyOptions: FrequencyOption[] = [
  { label: "10 Seconds", value: "*/10 * * * * *" }, // node-cron expression for every 10 seconds
  { label: "1 Minute", value: "* * * * *" }, // node-cron expression for every minute
  { label: "2 Hours", value: "0 */2 * * *" }, // node-cron expression for every 2 hours
];

const FormControlStyled = styled(FormControl)<FormControlProps>(() => ({
  margin: 16,
}));

const FrequencySelection = () => {
  const [selectedFrequency, setSelectedFrequency] = useState("* * * * *");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFrequencyChange = (event: SelectChangeEvent<string>) => {
    setSelectedFrequency(event.target.value);
  };

  const handleSetNotificationFrequency = () => {
    if (selectedFrequency) {
      window.electronAPI.notificationFrequency(selectedFrequency);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3>Get notification about cat facts</h3>
      <FormControlStyled>
        <Select value={selectedFrequency} onChange={handleFrequencyChange}>
          {frequencyOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Choose frequency</FormHelperText>
      </FormControlStyled>
      <Button variant="contained" onClick={handleSetNotificationFrequency}>
        Set Frequency
      </Button>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
      >
        <Alert severity="success">
          Notifications enabled! You'll receive updates at your chosen
          frequency.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FrequencySelection;
