/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getOmdb, getnyTimes } from "../services/api-request";

import styles from ".././styles/Movie-detals.module.scss";
import { HiArrowCircleLeft } from "react-icons/hi";

export default function MovieDetails() {
  const [movieData, setMovieData] = useState({});
  const [status, setStatus] = useState("idle");
  const [movieReview, setmovieReview] = useState({});

  const router = useRouter();
  const title = router.query.title;

  useEffect(() => {
    async function loadReview() {
      const review = await getnyTimes(title);
      setmovieReview(review);
    }
    if (title) {
      loadReview();
    }
  }, [title]);

  useEffect(() => {
    async function loadData() {
      try {
        setStatus("loading");
        const data = await getOmdb(title);
        if (data.Response === "False") {
          setStatus("error");
        } else {
          setMovieData(data);
          setStatus("success");
        }
      } catch (error) {
        setStatus("error");
      }
    }
    if (title) {
      loadData();
    }
  }, [title]);

  if (status === "loading" || status === "idle") {
    return (
      <div className={styles.message}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.message}>
        <h3>Filme não encontrado</h3>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.movieInfos}>
        <div className={styles.moviePosterContainer}>
          <img
            className={styles.movieImg}
            src={movieData.Poster}
            alt="Movie Poster"
          />
        </div>

        <div className={styles.movieDeatlsContainer}>
          <h2 className={styles.movieTitle}> {movieData.Title}</h2>
          <div className={styles.movieDetals}>
            <p className={styles.movieDirector}>{movieData.Director}</p>
            <p className={styles.movieGenre}>{movieData.Genre}</p>
          </div>
          <p className={styles.movieDescripstion}>{movieData.Plot}</p>
        </div>
      </main>

      <section className={styles.movieRating}>
        {movieData?.Ratings?.map((votes) => {
          return (
            <div key={votes.Source}>
              <h2>{votes.Source}</h2>
              <p>{votes.Value}</p>
            </div>
          );
        })}
      </section>

      <section className={styles.movieReviewContainer}>
        <h1>Crítica por NewYork Times:</h1>
        {movieReview?.results?.map((review) => {
          return (
            <div className={styles.reviewInfos} key={review.headline}>
              <div>
                <h3 className={styles.reviewTitle}>{review.headline}</h3>
                <p className={styles.reviewSummary}>{review.summary_short}</p>
                <a
                  className={styles.reviewLink}
                  href={review.link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver review completo
                </a>
              </div>
              <img
                className={styles.reviewImage}
                src={review.multimedia.src}
                alt=""
              />
            </div>
          );
        })}
      </section>
    </div>
  );
}
