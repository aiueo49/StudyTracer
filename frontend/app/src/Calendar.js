import React from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";

const MyCalendar = () => {
  const navigate = useNavigate();

  const handleDayClick = (date) => {
    const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD
    navigate(`/study_times/${dateString}`);
  };

  return (
    <Calendar
      onClickDay={handleDayClick}
    />
  );
};

export default MyCalendar;