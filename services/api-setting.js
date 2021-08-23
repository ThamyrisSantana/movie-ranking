import axios from "axios";

export const movieDb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
});
