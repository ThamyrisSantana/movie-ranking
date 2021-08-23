import { movieDb } from "./api-setting";

export const getMovieDb = async (page = 1) => {
  const req = await movieDb.get("/discover/movie", {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: "pt-BR",
      page: page,
    },
  });
  return req.data;
};
