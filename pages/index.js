import Head from "next/head";
import { useEffect, useState } from "react";

import { getMovieDb } from "../services/api-request";

import styles from "../styles/Home.module.scss";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";

import Button from "../components/change-page-btn/ChangePageBtn";
import Input from "../components/input-filter/InputFilter";
import MovieList from "../components/movie-item/MovieItem";

export default function Home() {
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState({});
  const [voteCount, setVoteCount] = useState(undefined);
  const [movieYear, setMovieYear] = useState(undefined);
  const [movieGenre, setMovieGenre] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getMovieDb(page, voteCount, movieYear, movieGenre);
      setMovieList(data);
    };
    getData();
  }, [page, voteCount, movieYear, movieGenre]);

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
              placeholder="Year"
              value={movieYear}
              setValue={setMovieYear}
            />

            <select
              className={styles.select}
              onChange={(e) => setMovieGenre(e.target.value)}
            >
              <optgroup>
                <option value="">Choose an option</option>
                <option value="28">Action</option>
                <option value="12">Adventure</option>
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                <option value="80">Crime</option>
                <option value="99">Documentary</option>
                <option value="18">Drama</option>
                <option value="10751">Family</option>
                <option value="14">Fantasy</option>
                <option value="36">History</option>
                <option value="27">Horror</option>
                <option value="10402">Music</option>
                <option value="9648">Mystery</option>
                <option value="10749">Romance</option>
                <option value="878">Science Fiction</option>
                <option value="10770">TV Movie</option>
                <option value="53">Thriller</option>
                <option value="10752">War</option>
                <option value="37">Western</option>
              </optgroup>
            </select>
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
