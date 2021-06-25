import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function MovieDatePicker({
  name,
  label,
  selectedDate,
  handleDateChange,
  minDate = null,
}) {
  minDate = minDate === null ? new Date(null) : minDate;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id={label}
        name={name}
        label={label}
        format="dd/MM/yyyy"
        value={selectedDate}
        minDate={minDate}
        emptyLabel={"dd/mm/yyyy"}
        onChange={(d, v) => handleDateChange(d, v, name)}
      />
    </MuiPickersUtilsProvider>
  );
}
