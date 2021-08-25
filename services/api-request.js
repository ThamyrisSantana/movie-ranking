import { movieDb } from "./api-setting";

export const getMovieDb = async (page = 1) => {
  const req = await movieDb.get("/discover/movie", {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: "pt-BR",
      page: page,
      sort_by: "vote_average.desc",
      primary_release_year: 2021,
      "vote_count.gte": 1000,
    },
  });
  return req.data;
};
