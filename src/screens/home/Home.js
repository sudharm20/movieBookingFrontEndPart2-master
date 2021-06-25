import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "./../../common/header/Header";
import UpComingMovies from "./HomeComponents/UpcomingMovies";
import AllMovies from "./HomeComponents/AllMovies";
import MoviesFilterForm from "./HomeComponents/MoviesFilterForm";

const Home = ({ baseUrl }) => {
  const [filterFormValues, setFilterFormValues] = useState({
    movieName: "",
    genresList: [],
    artistsList: [],
    releaseDateStart: null,
    releaseDateEnd: null,
  });
  const [releasedMovies, setReleasedMovies] = useState(null);
  const [publishedMovies, setPublishedMovies] = useState(null);
  const [artists, setArtists] = useState(null);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${baseUrl}movies?status=PUBLISHED`);
        const publishedMovies = await response.json();
        setPublishedMovies(publishedMovies);
      } catch (e) {
        console.warn(e);
      }
    })();
    (async () => {
      try {
        const response = await fetch(`${baseUrl}movies?status=RELEASED`);
        const releasedMovies = await response.json();
        setReleasedMovies(releasedMovies);
      } catch (e) {
        console.warn(e);
      }
    })();
    (async () => {
      try {
        const response = await fetch(`${baseUrl}genres`);
        const genres = await response.json();
        setGenres(genres);
      } catch (e) {
        console.warn(e);
      }
    })();
    (async () => {
      try {
        const response = await fetch(`${baseUrl}artists`);
        const artists = await response.json();
        setArtists(artists);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);
  const filterList = () => {
    let queryString = "?status=RELEASED";
    if (filterFormValues.movieName !== "") {
      queryString += "&title=" + filterFormValues.movieName;
    }
    if (filterFormValues.genresList.length > 0) {
      queryString += "&genres=" + filterFormValues.genresList.toString();
    }
    if (filterFormValues.artistsList.length > 0) {
      queryString += "&artists=" + filterFormValues.artistsList.toString();
    }
    if (filterFormValues.releaseDateStart !== null) {
      const startDate = new Date(filterFormValues.releaseDateStart);
      queryString +=
        "&start_date=" +
        `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`;
    }
    if (filterFormValues.releaseDateEnd !== null) {
      const endDate = new Date(filterFormValues.releaseDateEnd);
      queryString +=
        "&end_date=" +
        `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}`;
    }
    (async () => {
      try {
        const response = await fetch(`${baseUrl}movies${queryString}`);
        const filterData = await response.json();
        setReleasedMovies(filterData);
      } catch (e) {
        console.warn(e);
      }
    })();
  };

  const handleSubmit = e => {
    e.preventDefault();
    filterList();
  };

  const handleChange = e => {
    const formValues = { ...filterFormValues };
    formValues[e.target.name] = e.target.value;
    setFilterFormValues(formValues);
  };

  const handleAutoCompleteChange = (e, v) => {
    const formValues = { ...filterFormValues };
    formValues[`${e.target.id.split("-")[0]}List`] = v;
    setFilterFormValues(formValues);
  };

  const handleDateChange = (d, v, name) => {
    const formValues = { ...filterFormValues };
    formValues[name] = new Date(d).toDateString();
    setFilterFormValues(formValues);
  };

  return (
    <div>
      <Header baseUrl={baseUrl} />
      <div className="upcoming-movies-header">
        <span>Upcoming Movies</span>
      </div>
      {publishedMovies !== null ? (
        <UpComingMovies movies={publishedMovies} />
      ) : null}
      <div className="flex-container">
        <div className="left">
          {releasedMovies !== null ? (
            <AllMovies movies={releasedMovies} />
          ) : null}
        </div>
        <div className="right">
          <MoviesFilterForm
            genres={genres !== null ? genres : []}
            artists={artists !== null ? artists : []}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleAutoCompleteChange={handleAutoCompleteChange}
            handleDateChange={handleDateChange}
            releaseDateStart={filterFormValues.releaseDateStart}
            releaseDateEnd={filterFormValues.releaseDateEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
