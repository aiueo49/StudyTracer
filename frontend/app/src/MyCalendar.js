import * as React from 'react';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';

function MyCalendar({ onDateClick }) {
  const [value, setValue] = React.useState(null);
  const navigate = useNavigate();

  const handleDayClick = (newValue) => {
    setValue(newValue);
    const dateString = newValue.toISOString().split("T")[0]; // YYYY-MM-DD
    // navigate(`/study_times/${dateString}`);
    onDateClick(dateString);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={handleDayClick}
        components={{
          textField: TextField
        }}
      />
    </LocalizationProvider>
  );
}

export default MyCalendar;