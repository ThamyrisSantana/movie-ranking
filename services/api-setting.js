import axios from "axios";

export const movieDbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
});

export const omdbApi = axios.create({
  baseURL: "http://www.omdbapi.com/",
  timeout: 10000,
});

export const nyTimesApi = axios.create({
  baseURL: "https://api.nytimes.com/svc/movies/v2",
  timeout: 10000,
});
