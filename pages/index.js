import Link from "next/link";
import { useEffect, useState } from "react";

import { getMovieDb } from "../services/api-request";
import { Button } from "../components/button/Button";

import styles from "../styles/Home.module.scss";
import { HiStar, HiChevronRight, HiChevronLeft } from "react-icons/hi";

export default function Home() {
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await getMovieDb(page);
      setMovieList(data);
    };
    getData();
  }, [page]);

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

  console.log(movieList);

  return (
    <div className={styles.container}>
      <ol start={(page - 1) * 20 + 1} className={styles.ol}>
        {movieList.results?.map((movie) => {
          return (
            <div className={styles.movieContainer} key={movie.id}>
              <li className={styles.li}>
                <Link
                  className={styles.link}
                  cursor="pointer"
                  href={`/${movie.id}?title=${movie.original_title}`}
                  passHref
                >
                  <a className={styles.movieTitle}>{movie.title}</a>
                </Link>
              </li>
              <span className={styles.vote}>
                <HiStar className={styles.HiStar} />
                {movie.vote_average}
              </span>
            </div>
          );
        })}
      </ol>
      <footer className={styles.footer}>
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
      </footer>
    </div>
  );
}
