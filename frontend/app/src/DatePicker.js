import * as React from 'react';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';

function MyCalendar() {
  const [value, setValue] = React.useState(null);
  const navigate = useNavigate();

  const handleDayClick = (newValue) => {
    setValue(newValue);
    const dateString = newValue.toISOString().split("T")[0]; // YYYY-MM-DD
    navigate(`/study_times/${dateString}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Calendar"
        value={value}
        onChange={handleDayClick}
        components={{
          input: TextField,
        }}
      />
    </LocalizationProvider>
  );
}

export default MyCalendar;