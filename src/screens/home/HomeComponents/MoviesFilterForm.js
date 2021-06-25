import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  TextField,
  Typography,
  CardContent,
  Checkbox,
  Box,
  Button,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import MovieDatePicker from "./MovieDatePicker";

const useStyles = makeStyles(theme => {
  return {
    root: {
      width: "max-content",
    },
    header: {
      color: theme.palette.primary.light,
      textTransform: "uppercase",
      margin: theme.spacing(1),
    },
    inputStyles: {
      margin: theme.spacing(1),
      minWidth: 240,
      maxWidth: 240,
    },
    datePickerStyles: {
      display: "block",
    },
  };
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MoviesFilterForm(props) {
  const {
    genres,
    artists,
    handleSubmit,
    handleChange,
    handleAutoCompleteChange,
    handleDateChange,
    releaseDateStart,
    releaseDateEnd,
  } = props;
  const classes = useStyles();

  return (
    <div>
      <Card raised={true} className={classes.root}>
        <CardContent>
          <Typography className={classes.header} gutterBottom>
            Find Movies By:
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.inputStyles}
              label={"Movie Name"}
              name="movieName"
              onChange={handleChange}
            />
            <Autocomplete
              className={classes.inputStyles}
              onChange={handleAutoCompleteChange}
              name={"genres"}
              multiple
              id="genres"
              size="small"
              options={genres}
              getOptionLabel={option => option.name}
              disableCloseOnSelect
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </React.Fragment>
              )}
              renderInput={params => (
                <TextField {...params} variant="standard" label="Genres" />
              )}
            />
            <Autocomplete
              className={classes.inputStyles}
              onChange={handleAutoCompleteChange}
              name={"artists"}
              multiple
              id="artists"
              size="small"
              options={artists}
              getOptionLabel={option =>
                `${option.first_name} ${option.last_name}`
              }
              disableCloseOnSelect
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {`${option.first_name} ${option.last_name}`}
                </React.Fragment>
              )}
              renderInput={params => (
                <TextField {...params} variant="standard" label="Artists" />
              )}
            />
            <Box display="block" className={classes.inputStyles}>
              <MovieDatePicker
                label={"Release Date Start"}
                name={"releaseDateStart"}
                selectedDate={releaseDateStart}
                handleDateChange={handleDateChange}
              />
            </Box>
            <Box className={classes.inputStyles} display="block">
              <MovieDatePicker
                label={"Release Date End"}
                name={"releaseDateEnd"}
                selectedDate={releaseDateEnd}
                minDate={releaseDateStart}
                handleDateChange={handleDateChange}
              />
            </Box>
            <Button
              className={classes.inputStyles}
              variant="contained"
              color="primary"
              type="submit">
              Apply
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
