import { movieDbApi, omdbApi, nyTimesApi } from "./api-setting";

export const getMovieDb = async (
  page = 1,
  vote_count = 500,
  year = 2021,
  genre,
  sortBy = "vote_average.desc"
) => {
  const res = await movieDbApi.get("/discover/movie", {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY_MOVIEDB,
      language: "pt-BR",
      page: page,
      sort_by: sortBy,
      primary_release_year: year,
      "vote_count.gte": vote_count,
      with_genres: genre,
    },
  });
  return res.data;
};

export const getOmdb = async (title) => {
  const res = await omdbApi.get("/", {
    params: {
      apikey: process.env.NEXT_PUBLIC_API_KEY_OMDB,
      t: title,
      plot: "full",
    },
  });

  return res.data;
};

export const getnyTimes = async (title) => {
  const res = await nyTimesApi.get("/reviews/search.json", {
    params: {
      "api-key": process.env.NEXT_PUBLIC_API_KEY_NYT,
      query: title,
      "opening-date": "2021-01-01:2021-12-31",
    },
  });

  return res.data;
};
