import Header from "./../../common/header/Header";
import {
  Box,
  Button,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import YouTube from "react-youtube";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles({
  button: {
    margin: "8px 0px 0px 24px",
    "&:hover, &:focus": {
      cursor: "pointer",
    },
    height: 24,
  },
  typo: {
    marginTop: 16,
  },
});
const opts = {
  height: "390",
  width: "100%",
};
const Details = ({ match, baseUrl }) => {
  const classes = useStyles();
  const [rating, setRating] = useState(0);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${baseUrl}movie/${match.params.id.slice(1)}`
        );
        const movieData = await response.json();
        setMovie(movieData);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);
  if (movie === null)
    return (
      <React.Fragment>
        <Header showBookNowButton={true} baseUrl={baseUrl} />
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <Header showBookNowButton={true} baseUrl={baseUrl} />
      <Button component={Link} to="/" className={classes.button}>
        <ArrowBackIosIcon />
        Back to home
      </Button>
      <Grid container style={{ overflow: "hidden" }}>
        <Grid item xs={2}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <img src={movie.poster_url} alt="poster" />
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h2">{movie.title}</Typography>
          <Typography variant="body1">
            <strong>Genres: </strong>
            {movie.genres.toString()}
          </Typography>
          <Typography variant="body1">
            <strong>Duration: </strong>
            {movie.duration}
          </Typography>
          <Typography variant="body1">
            <strong>Release Date: </strong>
            {new Date(movie.release_date).toDateString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Rating: </strong>
            {movie.critics_rating}
          </Typography>
          <Typography className={classes.typo} variant="body1">
            <strong>Plot: </strong>
            <a href={movie.wiki_url}>(Wiki Link)</a>
            {" " + movie.storyline}
          </Typography>
          <Typography className={classes.typo} variant="body1">
            <strong>Trailer: </strong>
          </Typography>
          <YouTube videoId={movie.trailer_url.split("?v=")[1]} opts={opts} />
        </Grid>
        <Grid item xs={2} style={{ padding: 0 }}>
          <Box display="block">
            <Typography variant="body1">
              <strong>Rate this movie:</strong>
            </Typography>
            <br />
            <Rating
              name="customized-empty"
              size="large"
              value={rating}
              onChange={(e, v) => setRating(v)}
              icon={<StarBorderIcon fontSize="inherit" />}
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
          </Box>
          <Box display="block">
            <Typography>
              <span className="bold">Artists:</span>
            </Typography>
            <GridList cols={2} className={classes.typo}>
              {movie.artists.map(artist => (
                <GridListTile key={artist.id}>
                  <img src={artist.profile_url} alt={artist.first_name} />
                  <GridListTileBar
                    title={`${artist.first_name} ${artist.last_name}`}
                  />
                </GridListTile>
              ))}
            </GridList>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Details;
