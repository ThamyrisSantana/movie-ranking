/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getOmdb, getnyTimes } from "../services/api-request";
import Head from "next/head";

import styles from ".././styles/Movie-detals.module.scss";
import { HiArrowCircleLeft } from "react-icons/hi";

export default function MovieDetails() {
  const [movieData, setMovieData] = useState({});
  const [status, setStatus] = useState("idle");
  const [reviewStatus, setReviewStatus] = useState("idle");
  const [movieReview, setmovieReview] = useState({});

  const router = useRouter();
  const title = router.query.title;

  useEffect(() => {
    async function loadReview() {
      try {
        setReviewStatus("loading");
        const review = await getnyTimes(title);
        if (review.results === null) {
          setReviewStatus("error");
        } else {
          setmovieReview(review);
          setReviewStatus("success");
        }
      } catch (error) {
        setReviewStatus("error");
      }
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
      <div className={styles.container}>
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
      <Head>
        <title>{movieData.Title}</title>
        <link rel="shortcut icon" href="/trophy.png" />
      </Head>
      <header className={styles.header}>
        <Link href={"./"}>
          <a className={styles.a}>
            <HiArrowCircleLeft className={styles.backBtn} />
          </a>
        </Link>
      </header>
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
            <p className={styles.movieDirector}>
              <strong>Director: </strong>
              {movieData.Director}
            </p>
            <p className={styles.movieGenre}>
              <strong>Genre: </strong>
              {movieData.Genre}
            </p>
          </div>
          <p className={styles.movieDescripstion}>{movieData.Plot}</p>
        </div>
      </main>

      <section className={styles.movieRating}>
        {movieData.Ratings.length === 0 ? (
          <h2>Ratings not available</h2>
        ) : (
          movieData?.Ratings?.map((votes) => {
            return (
              <div key={votes.Source}>
                <h2>{votes.Source}</h2>
                <p>{votes.Value}</p>
              </div>
            );
          })
        )}
      </section>

      {reviewStatus === "loading" && <h2>Loading</h2>}
      {reviewStatus === "error" && <h2>Movie doesnt have a review</h2>}
      {reviewStatus === "success" && (
        <section className={styles.movieReviewContainer}>
          <h1>Review by NewYork Times:</h1>
          {movieReview?.results?.map((review) => {
            return (
              <div className={styles.reviewInfos} key={review.headline}>
                <div className={styles.reviewInfosContainer}>
                  <h3 className={styles.reviewTitle}>{review.headline}</h3>
                  <p className={styles.reviewSummary}>{review.summary_short}</p>
                  <a
                    className={styles.reviewLink}
                    href={review.link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read more
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
      )}
    </div>
  );
}
