import React from "react";
import Link from "next/link";

import styles from "./styles.module.scss";

import { HiStar } from "react-icons/hi";

const MovieList = (props) => {
  return (
    <div className={styles.movieContainer}>
      <li className={styles.li}>
        <Link
          className={styles.link}
          cursor="pointer"
          href={`/${props.movie.id}?title=${props.movie.original_title}`}
          passHref
        >
          <a className={styles.movieTitle}>{props.movie.title}</a>
        </Link>
      </li>
      <span className={styles.vote}>
        <HiStar className={styles.HiStar} />
        {props.movie.vote_average}
      </span>
    </div>
  );
};

export default MovieList;
