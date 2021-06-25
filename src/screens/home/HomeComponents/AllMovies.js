import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  link: {
    cursor: "pointer",
  },
});
export default function AllMovies({ movies }) {
  const classes = useStyles();
  return (
    <div>
      <GridList cols={4} cellHeight={350} className={classes.link}>
        {movies.map(movie => (
          <GridListTile
            component={Link}
            to={`/movie/${movie.id}`}
            key={movie.id}>
            <img src={movie.poster_url} alt={movie.title} />
            <GridListTileBar
              title={movie.title}
              subtitle={`Release Date: ${new Date(
                movie.release_date
              ).toDateString()}`}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
