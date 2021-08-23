import styles from "../styles/Home.module.css";
import { useEffect, useState, useCallback } from "react";
import { getMovieDb } from "../services/api-request";

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
      <ol>
        {movieList.results?.map((movie) => {
          return (
            <div key={movie.id}>
              <li>{movie.title}</li>
            </div>
          );
        })}
      </ol>
      <button onClick={getPreviousPage} disabled={page === 1}>
        {"<"}
      </button>
      <button onClick={getNextPage} disabled={movieList.total_pages === page}>
        {" "}
        {">"}{" "}
      </button>
    </div>
  );
}
