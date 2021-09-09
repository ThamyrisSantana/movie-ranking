import Head from "next/head";
import { useEffect, useState } from "react";

import { getMovieDb } from "../services/api-request";

import styles from "../styles/Home.module.scss";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";

import Button from "../components/change-page-btn/ChangePageBtn";
import Input from "../components/input-filter/InputFilter";
import MovieList from "../components/movie-item/MovieItem";
import SortButton from "../components/sort-button/SortButton";
import Select from "../components/Select/Select";

export default function Home() {
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState({});
  const [voteCount, setVoteCount] = useState(undefined);
  const [movieYear, setMovieYear] = useState(undefined);
  const [movieGenre, setMovieGenre] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortMoviesBy, setSortMoviesBy] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await getMovieDb(
        page,
        voteCount,
        movieYear,
        movieGenre,
        sortMoviesBy
      );
      setMovieList(data);
    };
    getData();
  }, [page, voteCount, movieYear, movieGenre, sortMoviesBy]);

  function menuToggle() {
    if (showFilters === false) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }
  }

  const getNextPage = () => {
    if (movieList.total_pages === page) {
      return;
    }
    setPage(page + 1);
  };

  const getPreviousPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ranking Page</title>
        <link rel="shortcut icon" href="/trophy.png" />
      </Head>
      <div
        className={
          showFilters
            ? styles.filterButtonContainer
            : styles.filterButtonContainerOff
        }
      >
        <button onClick={menuToggle}>
          <MdModeEdit className={styles.icon} />
          Filters
        </button>
      </div>
      {showFilters ? (
        <>
          <div className={styles.filters}>
            <Input
              placeholder="Vote Count"
              value={voteCount}
              setValue={setVoteCount}
            />
            <Input
              className={styles.InputGap}
              placeholder="Year"
              value={movieYear}
              setValue={setMovieYear}
            />
            <div className={styles.selectContainer}>
              <label htmlFor="Select">Genre</label>
              <Select onChange={setMovieGenre} value={movieGenre} />
            </div>
          </div>
          <div className={styles.filterButtons}>
            <SortButton
              buttonValue="vote_average.desc"
              setButtonFilter={setSortMoviesBy}
              filterName="Vote Average.desc"
            />
            <SortButton
              buttonValue="vote_average.asc"
              setButtonFilter={setSortMoviesBy}
              filterName="Vote Average.asc"
            />
            <SortButton
              buttonValue="popularity.desc"
              setButtonFilter={setSortMoviesBy}
              filterName="Popularity.Desc"
            />
            <SortButton
              buttonValue="popularity.asc"
              setButtonFilter={setSortMoviesBy}
              filterName="Popularity.asc"
            />
          </div>
        </>
      ) : null}
      <ol start={(page - 1) * 20 + 1} className={styles.ol}>
        {movieList.results?.map((movie) => {
          return <MovieList movie={movie} key={movie.id} />;
        })}
      </ol>
      <div className={styles.changePageButton}>
        <Button
          onClick={getPreviousPage}
          disabled={page === 1}
          text={<HiChevronLeft />}
        />
        <Button
          onClick={getNextPage}
          disabled={movieList.total_pages === page}
          text={<HiChevronRight />}
        />
      </div>
    </div>
  );
}
